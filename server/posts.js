import { pool } from './db.js'
import { validator } from './validate.js'

export const LIST_FIELDS = ['symptoms', 'causes', 'riskFactors', 'prevention', 'treatment', 'lifestyle', 'healthTips']
const TEXT_FIELDS = ['introduction', 'whyItMatters', 'whenToConsult', 'conclusion']

const parseJson = (value, fallback) => {
  if (value == null) return fallback
  try {
    return JSON.parse(value)
  } catch {
    return fallback
  }
}

export const slugify = (value) =>
  String(value)
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 180)

function readingMinutes(content) {
  const text = [
    ...TEXT_FIELDS.map((f) => content[f] || ''),
    ...LIST_FIELDS.flatMap((f) => content[f] || []),
    ...(content.faqs || []).flatMap((faq) => [faq.q, faq.a]),
  ].join(' ')
  const words = text.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

export function serializePost(row, { withContent = true } = {}) {
  const content = parseJson(row.content, {})
  const post = {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    category: row.category,
    author: row.author_name,
    authorDetails: parseJson(row.author_details, null),
    coverImage: row.cover_image,
    coverAlt: row.cover_alt || row.title,
    metaTitle: row.meta_title,
    metaDescription: row.meta_description,
    status: row.status,
    views: row.views,
    readingTime: readingMinutes(content),
    publishedAt: row.published_at,
    updatedAt: row.updated_at,
    createdAt: row.created_at,
  }
  if (withContent) post.content = content
  return post
}

export async function findPublishedPostBySlug(slug) {
  const [[row]] = await pool.query(
    "SELECT * FROM blog_posts WHERE slug = ? AND status = 'published' AND published_at <= UTC_TIMESTAMP()",
    [slug]
  )
  return row ? serializePost(row) : null
}

const cleanList = (value) =>
  (Array.isArray(value) ? value : [])
    .map((item) => String(item ?? '').trim())
    .filter(Boolean)
    .slice(0, 30)
    .map((item) => item.slice(0, 500))

/** Validate an admin create/update payload and return database column values. */
export function readPostInput(body) {
  const v = validator(body)
  const title = v.text('title', { label: 'Title', required: true, max: 255 })
  const slug = slugify(v.text('slug', { label: 'URL slug', max: 190 }) || title)
  if (!slug) v.fail('slug', 'URL slug is required.')
  const excerpt = v.text('excerpt', { label: 'Short description', required: true, max: 600 })
  const category = v.text('category', { label: 'Category', required: true, max: 100 })
  const author = v.text('author', { label: 'Author', required: true, max: 150 })
  const coverImage = v.text('coverImage', {
    label: 'Cover image',
    max: 500,
    pattern: /^(\/uploads\/|https:\/\/)/,
    patternMessage: 'Cover image must be an uploaded image or an https:// URL.',
  })
  const coverAlt = v.text('coverAlt', { label: 'Image description', max: 255 })
  const metaTitle = v.text('metaTitle', { label: 'SEO title', max: 255 })
  const metaDescription = v.text('metaDescription', { label: 'SEO description', max: 320 })
  const status = v.oneOf('status', ['draft', 'published'], { label: 'Status', fallback: 'draft' })

  let publishedAt = null
  if (body.publishedAt) {
    publishedAt = new Date(body.publishedAt)
    if (Number.isNaN(publishedAt.getTime())) v.fail('publishedAt', 'Publish date is not valid.')
  }

  const rawDetails = body.authorDetails || {}
  const authorDetails = {
    name: author,
    photo: typeof rawDetails.photo === 'string' && /^(\/uploads\/|https:\/\/)/.test(rawDetails.photo) ? rawDetails.photo : null,
    qualification: String(rawDetails.qualification ?? '').trim().slice(0, 200),
    specialization: String(rawDetails.specialization ?? '').trim().slice(0, 200),
    experience: String(rawDetails.experience ?? '').trim().slice(0, 100),
  }

  const rawContent = body.content || {}
  const content = {}
  for (const field of TEXT_FIELDS) content[field] = String(rawContent[field] ?? '').trim().slice(0, 10000)
  for (const field of LIST_FIELDS) content[field] = cleanList(rawContent[field])
  content.faqs = (Array.isArray(rawContent.faqs) ? rawContent.faqs : [])
    .map((faq) => ({ q: String(faq?.q ?? '').trim().slice(0, 300), a: String(faq?.a ?? '').trim().slice(0, 2000) }))
    .filter((faq) => faq.q && faq.a)
    .slice(0, 20)
  if (!content.introduction) v.fail('content.introduction', 'Introduction is required.')

  v.done()

  return {
    slug,
    title,
    excerpt,
    category,
    author_name: author,
    author_details: JSON.stringify(authorDetails),
    cover_image: coverImage || null,
    cover_alt: coverAlt || null,
    content: JSON.stringify(content),
    meta_title: metaTitle || null,
    meta_description: metaDescription || null,
    status,
    published_at: publishedAt,
  }
}

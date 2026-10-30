import { pool } from './db.js'
import { config } from './config.js'
import { findPublishedPostBySlug } from './posts.js'
import { SITE, PAGE_META, NOT_FOUND_META } from '../shared/site.js'

const escapeHtml = (value) =>
  String(value ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))

const absolute = (url) => (!url ? '' : /^https?:\/\//.test(url) ? url : `${config.siteUrl}${url}`)

/** Work out the title, description, image and HTTP status for a page URL. */
export async function resolvePageMeta(pathname) {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname

  if (PAGE_META[path]) {
    return { status: 200, type: 'website', path, ...PAGE_META[path] }
  }

  const blogMatch = path.match(/^\/blogs\/([a-z0-9-]+)$/)
  if (blogMatch) {
    const post = await findPublishedPostBySlug(blogMatch[1])
    if (post) {
      return {
        status: 200,
        type: 'article',
        path,
        title: `${post.metaTitle || post.title} | ${SITE.name}`,
        description: post.metaDescription || post.excerpt,
        image: post.coverImage,
        publishedAt: post.publishedAt,
      }
    }
  }

  return { status: 404, type: 'website', path, robots: 'noindex, follow', ...NOT_FOUND_META }
}

/**
 * Tags injected into index.html for crawlers that don't run JavaScript
 * (Facebook, WhatsApp, LinkedIn, X). The app removes them on start-up and
 * renders its own, so browsers never see duplicates.
 */
export function renderHeadTags(meta) {
  const url = `${config.siteUrl}${meta.path === '/' ? '/' : meta.path}`
  const image = absolute(meta.image || SITE.shareImage)
  const tags = [
    `<title data-seo>${escapeHtml(meta.title)}</title>`,
    `<meta data-seo name="description" content="${escapeHtml(meta.description)}" />`,
    `<meta data-seo name="robots" content="${meta.robots || 'index, follow, max-image-preview:large'}" />`,
    `<meta data-seo property="og:type" content="${meta.type}" />`,
    `<meta data-seo property="og:site_name" content="${escapeHtml(SITE.name)}" />`,
    `<meta data-seo property="og:title" content="${escapeHtml(meta.title)}" />`,
    `<meta data-seo property="og:description" content="${escapeHtml(meta.description)}" />`,
    `<meta data-seo property="og:image" content="${escapeHtml(image)}" />`,
    `<meta data-seo property="og:locale" content="en_IN" />`,
    `<meta data-seo name="twitter:card" content="summary_large_image" />`,
  ]
  if (meta.status === 200) {
    tags.push(`<link data-seo rel="canonical" href="${escapeHtml(url)}" />`)
    tags.push(`<meta data-seo property="og:url" content="${escapeHtml(url)}" />`)
  }
  if (meta.publishedAt) {
    tags.push(`<meta data-seo property="article:published_time" content="${new Date(meta.publishedAt).toISOString()}" />`)
  }
  return tags.join('\n    ')
}

export function injectHead(html, meta) {
  return html.replace(/<!--seo:start-->[\s\S]*?<!--seo:end-->/, `<!--seo:start-->\n    ${renderHeadTags(meta)}\n    <!--seo:end-->`)
}

export async function renderSitemap() {
  const [posts] = await pool.query(
    "SELECT slug, updated_at FROM blog_posts WHERE status = 'published' AND published_at <= UTC_TIMESTAMP() ORDER BY published_at DESC"
  )
  const priorities = { '/': '1.0', '/contact': '0.9', '/doctors': '0.9', '/departments': '0.9', '/blogs': '0.8' }
  const pages = Object.keys(PAGE_META).map((path) => ({
    loc: `${config.siteUrl}${path}`,
    priority: priorities[path] || (path.includes('privacy') || path.includes('terms') ? '0.3' : '0.7'),
  }))
  const articles = posts.map((post) => ({
    loc: `${config.siteUrl}/blogs/${post.slug}`,
    lastmod: new Date(post.updated_at).toISOString().slice(0, 10),
    priority: '0.6',
  }))

  const urls = [...pages, ...articles]
    .map(
      (u) =>
        `  <url>\n    <loc>${escapeHtml(u.loc)}</loc>\n` +
        (u.lastmod ? `    <lastmod>${u.lastmod}</lastmod>\n` : '') +
        `    <priority>${u.priority}</priority>\n  </url>`
    )
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

export function renderRobots() {
  return ['User-agent: *', 'Allow: /', 'Disallow: /admin', 'Disallow: /api/', '', `Sitemap: ${config.siteUrl}/sitemap.xml`, ''].join('\n')
}

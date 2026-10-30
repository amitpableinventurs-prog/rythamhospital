import React, { useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Save, Plus, Trash2, ExternalLink, Loader2 } from 'lucide-react'
import { api } from '../../lib/api'
import useApi from '../../hooks/useApi'
import { SITE_URL } from '../../lib/seo'
import { PageHeader, Alert, ImageUpload } from '../components'

const LIST_FIELDS = [
  { key: 'symptoms', label: 'Common symptoms' },
  { key: 'causes', label: 'Causes' },
  { key: 'riskFactors', label: 'Risk factors' },
  { key: 'prevention', label: 'Prevention tips' },
  { key: 'healthTips', label: 'Healthy lifestyle tips (highlighted box)' },
  { key: 'treatment', label: 'Treatment options (numbered)' },
  { key: 'lifestyle', label: 'Lifestyle recommendations' },
]

const EMPTY_POST = {
  title: '',
  slug: '',
  excerpt: '',
  category: '',
  author: '',
  authorDetails: { photo: '', qualification: '', specialization: '', experience: '' },
  coverImage: '',
  coverAlt: '',
  metaTitle: '',
  metaDescription: '',
  status: 'draft',
  publishedAt: '',
  content: {
    introduction: '', whyItMatters: '', whenToConsult: '', conclusion: '',
    symptoms: [], causes: [], riskFactors: [], prevention: [], healthTips: [], treatment: [], lifestyle: [],
    faqs: [],
  },
}

const slugify = (value) =>
  value.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 180)

// <input type="datetime-local"> wants local time without a timezone.
const toLocalInput = (iso) => {
  if (!iso) return ''
  const date = new Date(iso)
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16)
}

// Copy `source` over `defaults`, turning null (empty database columns) into the default.
const withDefaults = (defaults, source = {}) =>
  Object.fromEntries(Object.entries(defaults).map(([key, value]) => [key, source?.[key] ?? value]))

// Store list fields as text (one item per line) while editing.
const toForm = (post) => ({
  ...withDefaults(EMPTY_POST, post),
  id: post.id,
  authorDetails: withDefaults(EMPTY_POST.authorDetails, post.authorDetails),
  publishedAt: toLocalInput(post.publishedAt),
  content: {
    ...withDefaults(EMPTY_POST.content, post.content),
    ...Object.fromEntries(LIST_FIELDS.map(({ key }) => [key, (post.content?.[key] || []).join('\n')])),
    faqs: post.content?.faqs || [],
  },
})

const toPayload = (form) => ({
  ...form,
  publishedAt: form.publishedAt ? new Date(form.publishedAt).toISOString() : null,
  content: {
    ...form.content,
    ...Object.fromEntries(LIST_FIELDS.map(({ key }) => [key, String(form.content[key] || '').split('\n').map((s) => s.trim()).filter(Boolean)])),
  },
})

const Counter = ({ value, ideal }) => {
  const length = value.length
  const state = length === 0 ? '' : length > ideal ? 'over' : 'ok'
  return <small className={`admin-counter ${state}`}>{length} / {ideal}</small>
}

// Loads the post (when editing), then mounts the form with it.
const PostEditor = () => {
  const { id } = useParams()
  const existing = useApi(id ? `/admin/posts/${id}` : null)

  if (!id) return <PostForm initialPost={EMPTY_POST} />
  if (existing.error) return <Alert>{existing.error.message}</Alert>
  if (existing.loading || !existing.data) return <div className="admin-card admin-skeleton" style={{ height: 400 }} />
  return <PostForm key={id} id={id} initialPost={existing.data.post} />
}

const PostForm = ({ id, initialPost }) => {
  const isNew = !id
  const navigate = useNavigate()
  const location = useLocation()
  const allPosts = useApi('/admin/posts')
  const [form, setForm] = useState(() => toForm(initialPost))
  const [slugTouched, setSlugTouched] = useState(!isNew)
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState(location.state?.message || { type: '', text: '' })
  const [saving, setSaving] = useState(false)

  const categories = [...new Set((allPosts.data?.items || []).map((p) => p.category))].sort()

  const set = (key, value) => {
    setForm((prev) => {
      const next = { ...prev, [key]: value }
      if (key === 'title' && !slugTouched) next.slug = slugify(value)
      return next
    })
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }
  const setContent = (key, value) => {
    setForm((prev) => ({ ...prev, content: { ...prev.content, [key]: value } }))
    setErrors((prev) => ({ ...prev, [`content.${key}`]: undefined }))
  }
  const setAuthor = (key, value) => setForm((prev) => ({ ...prev, authorDetails: { ...prev.authorDetails, [key]: value } }))
  const setFaq = (index, key, value) =>
    setContent('faqs', form.content.faqs.map((faq, i) => (i === index ? { ...faq, [key]: value } : faq)))

  const save = async (statusOverride) => {
    setSaving(true)
    setMessage({ type: '', text: '' })
    const payload = toPayload({ ...form, status: statusOverride || form.status })
    try {
      const { post } = isNew ? await api.post('/admin/posts', payload) : await api.put(`/admin/posts/${id}`, payload)
      setErrors({})
      const saved = { type: 'success', text: post.status === 'published' ? 'Saved and published.' : 'Draft saved.' }
      if (isNew) {
        navigate(`/admin/posts/${post.id}`, { replace: true, state: { message: saved } })
        return
      }
      setForm(toForm(post))
      setMessage(saved)
    } catch (err) {
      setErrors(err.fields || {})
      setMessage({ type: 'error', text: err.message })
    } finally {
      setSaving(false)
    }
  }

  const seoTitle = form.metaTitle || form.title || 'Article title'
  const seoDescription = form.metaDescription || form.excerpt || 'The short description is shown here in search results.'
  const fieldError = (key) => errors[key] && <small className="admin-field-error">{errors[key]}</small>

  return (
    <form onSubmit={(e) => { e.preventDefault(); save() }}>
      <PageHeader title={isNew ? 'New blog post' : 'Edit blog post'}>
        <Link to="/admin/posts" className="admin-btn admin-btn-ghost"><ArrowLeft size={16} /> All posts</Link>
        {!isNew && form.status === 'published' && (
          <a href={`/blogs/${form.slug}`} target="_blank" rel="noopener noreferrer" className="admin-btn admin-btn-ghost">
            <ExternalLink size={16} /> View
          </a>
        )}
        <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
          {saving ? <Loader2 size={16} className="spin" /> : <Save size={16} />} Save
        </button>
      </PageHeader>

      <Alert type={message.type || 'error'}>{message.text}</Alert>

      <div className="admin-editor">
        <div className="admin-editor-main">
          <section className="admin-card">
            <h2 className="admin-card-title">Article</h2>
            <label className="admin-field">
              <span>Title *</span>
              <input value={form.title} onChange={(e) => set('title', e.target.value)} maxLength={255} required />
              {fieldError('title')}
            </label>
            <label className="admin-field">
              <span>URL</span>
              <div className="admin-slug">
                <span>/blogs/</span>
                <input
                  value={form.slug}
                  onChange={(e) => { setSlugTouched(true); set('slug', slugify(e.target.value)) }}
                  maxLength={190}
                />
              </div>
              {fieldError('slug')}
            </label>
            <label className="admin-field">
              <span>Short description *</span>
              <textarea rows={3} value={form.excerpt} onChange={(e) => set('excerpt', e.target.value)} maxLength={600} />
              <small className="admin-hint">Shown on blog cards and under the title.</small>
              {fieldError('excerpt')}
            </label>
            <label className="admin-field">
              <span>Introduction *</span>
              <textarea rows={5} value={form.content.introduction} onChange={(e) => setContent('introduction', e.target.value)} />
              {fieldError('content.introduction')}
            </label>
            <label className="admin-field">
              <span>Why this topic matters</span>
              <textarea rows={3} value={form.content.whyItMatters} onChange={(e) => setContent('whyItMatters', e.target.value)} />
            </label>
          </section>

          <section className="admin-card">
            <h2 className="admin-card-title">Sections</h2>
            <p className="admin-muted">Write one item per line. Leave a section empty to hide it.</p>
            <div className="admin-grid-2">
              {LIST_FIELDS.map(({ key, label }) => (
                <label className="admin-field" key={key}>
                  <span>{label}</span>
                  <textarea rows={5} value={form.content[key]} onChange={(e) => setContent(key, e.target.value)} />
                </label>
              ))}
            </div>
            <label className="admin-field">
              <span>When to consult a doctor</span>
              <textarea rows={3} value={form.content.whenToConsult} onChange={(e) => setContent('whenToConsult', e.target.value)} />
            </label>
            <label className="admin-field">
              <span>Conclusion</span>
              <textarea rows={3} value={form.content.conclusion} onChange={(e) => setContent('conclusion', e.target.value)} />
            </label>
          </section>

          <section className="admin-card">
            <div className="admin-card-header">
              <h2 className="admin-card-title">Frequently asked questions</h2>
              <button type="button" className="admin-btn admin-btn-ghost" onClick={() => setContent('faqs', [...form.content.faqs, { q: '', a: '' }])}>
                <Plus size={16} /> Add question
              </button>
            </div>
            {form.content.faqs.length === 0 && <p className="admin-muted">No questions yet. FAQs can show up directly in Google results.</p>}
            {form.content.faqs.map((faq, index) => (
              <div className="admin-faq" key={index}>
                <div className="admin-faq-fields">
                  <input placeholder="Question" value={faq.q} onChange={(e) => setFaq(index, 'q', e.target.value)} aria-label={`Question ${index + 1}`} />
                  <textarea placeholder="Answer" rows={2} value={faq.a} onChange={(e) => setFaq(index, 'a', e.target.value)} aria-label={`Answer ${index + 1}`} />
                </div>
                <button
                  type="button"
                  className="admin-icon-btn danger"
                  onClick={() => setContent('faqs', form.content.faqs.filter((_, i) => i !== index))}
                  aria-label={`Remove question ${index + 1}`}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </section>
        </div>

        <aside className="admin-editor-side">
          <section className="admin-card">
            <h2 className="admin-card-title">Publishing</h2>
            <label className="admin-field">
              <span>Status</span>
              <select value={form.status} onChange={(e) => set('status', e.target.value)}>
                <option value="draft">Draft (hidden)</option>
                <option value="published">Published</option>
              </select>
            </label>
            <label className="admin-field">
              <span>Publish date</span>
              <input type="datetime-local" value={form.publishedAt} onChange={(e) => set('publishedAt', e.target.value)} />
              <small className="admin-hint">Leave empty to use the moment you publish. A future date schedules the post.</small>
              {fieldError('publishedAt')}
            </label>
            <label className="admin-field">
              <span>Category *</span>
              <input list="post-categories" value={form.category} onChange={(e) => set('category', e.target.value)} maxLength={100} />
              <datalist id="post-categories">
                {categories.map((c) => <option key={c} value={c} />)}
              </datalist>
              {fieldError('category')}
            </label>
          </section>

          <section className="admin-card">
            <h2 className="admin-card-title">Cover image</h2>
            <ImageUpload
              label="Image"
              value={form.coverImage}
              onChange={(url) => set('coverImage', url)}
              hint="Landscape photos work best (at least 1200 x 600). Without one, a themed illustration is used."
            />
            {fieldError('coverImage')}
            <label className="admin-field">
              <span>Image description (alt text)</span>
              <input value={form.coverAlt} onChange={(e) => set('coverAlt', e.target.value)} maxLength={255} placeholder="e.g. Doctor checking a patient's blood pressure" />
              <small className="admin-hint">Describe the photo for visually impaired visitors and Google Images.</small>
            </label>
          </section>

          <section className="admin-card">
            <h2 className="admin-card-title">Author</h2>
            <label className="admin-field">
              <span>Name *</span>
              <input value={form.author} onChange={(e) => set('author', e.target.value)} maxLength={150} placeholder="Dr. ..." />
              {fieldError('author')}
            </label>
            <ImageUpload label="Photo" aspect="1 / 1" value={form.authorDetails.photo} onChange={(url) => setAuthor('photo', url)} />
            <label className="admin-field">
              <span>Qualification</span>
              <input value={form.authorDetails.qualification} onChange={(e) => setAuthor('qualification', e.target.value)} placeholder="MBBS, MD" />
            </label>
            <label className="admin-field">
              <span>Specialisation</span>
              <input value={form.authorDetails.specialization} onChange={(e) => setAuthor('specialization', e.target.value)} />
            </label>
            <label className="admin-field">
              <span>Experience</span>
              <input value={form.authorDetails.experience} onChange={(e) => setAuthor('experience', e.target.value)} placeholder="10+ Years Experience" />
            </label>
          </section>

          <section className="admin-card">
            <h2 className="admin-card-title">Search engine (SEO)</h2>
            <div className="admin-serp" aria-label="Google search preview">
              <small>{SITE_URL.replace(/^https?:\/\//, '')} › blogs › {form.slug || 'article'}</small>
              <strong>{seoTitle}</strong>
              <p>{seoDescription}</p>
            </div>
            <label className="admin-field">
              <span>SEO title <Counter value={form.metaTitle} ideal={60} /></span>
              <input value={form.metaTitle} onChange={(e) => set('metaTitle', e.target.value)} maxLength={255} placeholder={form.title} />
              {fieldError('metaTitle')}
            </label>
            <label className="admin-field">
              <span>SEO description <Counter value={form.metaDescription} ideal={160} /></span>
              <textarea rows={3} value={form.metaDescription} onChange={(e) => set('metaDescription', e.target.value)} maxLength={320} placeholder={form.excerpt} />
              <small className="admin-hint">Optional. Falls back to the title and short description.</small>
              {fieldError('metaDescription')}
            </label>
          </section>
        </aside>
      </div>
    </form>
  )
}

export default PostEditor

import React, { useRef, useState } from 'react'
import { Upload, Trash2, Save, Image as ImageIcon, Loader2 } from 'lucide-react'
import useApi from '../../hooks/useApi'
import { api } from '../../lib/api'
import { PageHeader, EmptyState, Alert } from '../components'

const SUGGESTED = ['Hospital', 'Rooms', 'Equipment', 'Staff', 'Events']

const GalleryItem = ({ item, onChanged, onError }) => {
  const [draft, setDraft] = useState({ title: item.title, category: item.category, sortOrder: item.sortOrder ?? 0 })
  const [busy, setBusy] = useState(false)
  const dirty = draft.title !== item.title || draft.category !== item.category || Number(draft.sortOrder) !== (item.sortOrder ?? 0)

  const save = async () => {
    setBusy(true)
    try {
      await api.patch(`/admin/gallery/${item.id}`, draft)
      onChanged()
    } catch (err) {
      onError(err.message)
    } finally {
      setBusy(false)
    }
  }

  const remove = async () => {
    if (!window.confirm('Delete this photo from the gallery?')) return
    try {
      await api.delete(`/admin/gallery/${item.id}`)
      onChanged()
    } catch (err) {
      onError(err.message)
    }
  }

  return (
    <li className="admin-gallery-item">
      <img src={item.image} alt={item.title} loading="lazy" />
      <div className="admin-gallery-fields">
        <input value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} aria-label="Description" maxLength={200} />
        <div className="admin-gallery-row">
          <input list="gallery-categories" value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value })} aria-label="Category" maxLength={100} />
          <input type="number" value={draft.sortOrder} onChange={(e) => setDraft({ ...draft, sortOrder: e.target.value })} aria-label="Order" title="Order (lower numbers show first)" />
        </div>
        <div className="admin-gallery-actions">
          <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={save} disabled={!dirty || busy}>
            <Save size={14} /> Save
          </button>
          <button className="admin-icon-btn danger" onClick={remove} aria-label={`Delete ${item.title}`}>
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </li>
  )
}

const GalleryManager = () => {
  const { data, error, loading, reload } = useApi('/gallery')
  const fileInput = useRef(null)
  const [file, setFile] = useState(null)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  const items = data?.items || []
  const categories = [...new Set([...SUGGESTED, ...items.map((i) => i.category)])]

  const upload = async (e) => {
    e.preventDefault()
    if (!file) return setMessage({ type: 'error', text: 'Please choose a photo.' })
    setBusy(true)
    setMessage({ type: '', text: '' })
    try {
      const body = new FormData()
      body.append('image', file)
      body.append('title', title)
      body.append('category', category)
      await api.post('/admin/gallery', body)
      setFile(null)
      setTitle('')
      if (fileInput.current) fileInput.current.value = ''
      setMessage({ type: 'success', text: 'Photo added to the gallery.' })
      reload()
    } catch (err) {
      setMessage({ type: 'error', text: err.fields ? Object.values(err.fields).join(' ') : err.message })
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <PageHeader
        title="Gallery"
        description="Photos shown on the website's gallery. Until you add some, the site shows illustrations."
      />

      <form className="admin-card admin-gallery-upload" onSubmit={upload}>
        <h2 className="admin-card-title">Add a photo</h2>
        <div className="admin-gallery-upload-grid">
          <label className="admin-field">
            <span>Photo</span>
            <input ref={fileInput} type="file" accept="image/jpeg,image/png,image/webp,image/avif" onChange={(e) => setFile(e.target.files?.[0] || null)} />
          </label>
          <label className="admin-field">
            <span>Description</span>
            <input value={title} onChange={(e) => setTitle(e.target.value)} maxLength={200} placeholder="e.g. Modern ICU with 20 beds" />
          </label>
          <label className="admin-field">
            <span>Category</span>
            <input list="gallery-categories" value={category} onChange={(e) => setCategory(e.target.value)} maxLength={100} placeholder="e.g. Rooms" />
          </label>
          <button className="admin-btn admin-btn-primary" disabled={busy}>
            {busy ? <Loader2 size={16} className="spin" /> : <Upload size={16} />} {busy ? 'Uploading...' : 'Upload'}
          </button>
        </div>
        <small className="admin-hint">Photos are resized and converted to WebP automatically for fast loading.</small>
        <datalist id="gallery-categories">
          {categories.map((c) => <option key={c} value={c} />)}
        </datalist>
      </form>

      <Alert type={message.type || 'error'}>{message.text || error?.message}</Alert>

      {loading && !data ? (
        <div className="admin-card admin-skeleton" style={{ height: 240 }} />
      ) : items.length === 0 ? (
        <EmptyState icon={ImageIcon} title="No photos yet">
          Upload real photos of the hospital, rooms, equipment and team to replace the illustrations.
        </EmptyState>
      ) : (
        <ul className="admin-gallery-grid">
          {items.map((item) => (
            <GalleryItem key={item.id} item={item} onChanged={reload} onError={(text) => setMessage({ type: 'error', text })} />
          ))}
        </ul>
      )}
    </>
  )
}

export default GalleryManager

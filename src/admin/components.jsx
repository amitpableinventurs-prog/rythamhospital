import React, { useRef, useState } from 'react'
import { Upload, X, Loader2 } from 'lucide-react'
import { api } from '../lib/api'

export const PageHeader = ({ title, description, children }) => (
  <div className="admin-page-header">
    <div>
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </div>
    {children && <div className="admin-page-actions">{children}</div>}
  </div>
)

export const StatusBadge = ({ status }) => <span className={`admin-badge admin-badge-${status}`}>{status}</span>

export const EmptyState = ({ icon: Icon, title, children }) => (
  <div className="admin-empty">
    {Icon && <Icon size={40} aria-hidden="true" />}
    <h2>{title}</h2>
    {children && <p>{children}</p>}
  </div>
)

export const Alert = ({ type = 'error', children }) =>
  children ? <div className={`admin-alert admin-alert-${type}`} role={type === 'error' ? 'alert' : 'status'}>{children}</div> : null

/** Image picker that uploads immediately and reports the stored URL. */
export const ImageUpload = ({ value, onChange, label = 'Image', hint, aspect = '16 / 9' }) => {
  const input = useRef(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const upload = async (file) => {
    if (!file) return
    setBusy(true)
    setError('')
    try {
      const body = new FormData()
      body.append('image', file)
      const result = await api.post('/admin/uploads', body)
      onChange(result.url)
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
      if (input.current) input.current.value = ''
    }
  }

  return (
    <div className="admin-field">
      <span>{label}</span>
      <div className="admin-upload" style={{ aspectRatio: aspect }}>
        {value ? (
          <>
            <img src={value} alt="" />
            <button type="button" className="admin-upload-remove" onClick={() => onChange('')} aria-label="Remove image">
              <X size={16} />
            </button>
          </>
        ) : (
          <button type="button" className="admin-upload-empty" onClick={() => input.current?.click()} disabled={busy}>
            {busy ? <Loader2 size={26} className="spin" /> : <Upload size={26} />}
            <strong>{busy ? 'Uploading...' : 'Upload image'}</strong>
            <small>JPG, PNG or WebP up to 10 MB</small>
          </button>
        )}
      </div>
      {value && (
        <button type="button" className="admin-link-btn" onClick={() => input.current?.click()} disabled={busy}>
          {busy ? 'Uploading...' : 'Replace image'}
        </button>
      )}
      <input
        ref={input}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        hidden
        onChange={(e) => upload(e.target.files?.[0])}
      />
      {hint && <small className="admin-hint">{hint}</small>}
      {error && <small className="admin-field-error">{error}</small>}
    </div>
  )
}

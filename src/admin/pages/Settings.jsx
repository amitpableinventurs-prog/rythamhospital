import React, { useState } from 'react'
import { KeyRound } from 'lucide-react'
import { api } from '../../lib/api'
import { PageHeader, Alert } from '../components'

const Settings = () => {
  const [values, setValues] = useState({ currentPassword: '', newPassword: '', confirm: '' })
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState({ type: '', text: '' })
  const [busy, setBusy] = useState(false)

  const change = (e) => setValues({ ...values, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setMessage({ type: '', text: '' })
    if (values.newPassword !== values.confirm) {
      setErrors({ confirm: 'The new passwords do not match.' })
      return
    }
    setBusy(true)
    try {
      await api.put('/admin/password', { currentPassword: values.currentPassword, newPassword: values.newPassword })
      setValues({ currentPassword: '', newPassword: '', confirm: '' })
      setErrors({})
      setMessage({ type: 'success', text: 'Password changed.' })
    } catch (err) {
      setErrors(err.fields || {})
      setMessage({ type: 'error', text: err.message })
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <PageHeader title="Settings" />
      <form className="admin-card admin-narrow" onSubmit={submit}>
        <h2 className="admin-card-title">Change password</h2>
        <Alert type={message.type || 'error'}>{message.text}</Alert>
        <label className="admin-field">
          <span>Current password</span>
          <input type="password" name="currentPassword" value={values.currentPassword} onChange={change} autoComplete="current-password" required />
          {errors.currentPassword && <small className="admin-field-error">{errors.currentPassword}</small>}
        </label>
        <label className="admin-field">
          <span>New password</span>
          <input type="password" name="newPassword" value={values.newPassword} onChange={change} autoComplete="new-password" minLength={10} required />
          <small className="admin-hint">At least 10 characters.</small>
          {errors.newPassword && <small className="admin-field-error">{errors.newPassword}</small>}
        </label>
        <label className="admin-field">
          <span>Confirm new password</span>
          <input type="password" name="confirm" value={values.confirm} onChange={change} autoComplete="new-password" required />
          {errors.confirm && <small className="admin-field-error">{errors.confirm}</small>}
        </label>
        <button className="admin-btn admin-btn-primary" disabled={busy}>
          <KeyRound size={16} /> {busy ? 'Saving...' : 'Change password'}
        </button>
      </form>
    </>
  )
}

export default Settings

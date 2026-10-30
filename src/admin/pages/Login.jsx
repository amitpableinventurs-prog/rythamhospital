import React, { useState } from 'react'
import { LogIn, AlertCircle } from 'lucide-react'
import { api } from '../../lib/api'
import { useAdmin } from '../context'
import logo from '../../assets/nav-img.jpeg'

const Login = () => {
  const { setAdmin } = useAdmin()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      const data = await api.post('/admin/login', { email, password })
      setAdmin(data.admin)
    } catch (err) {
      setError(err.message)
      setBusy(false)
    }
  }

  return (
    <div className="admin-login">
      <form className="admin-login-card" onSubmit={submit}>
        <img src={logo} alt="Rhythm Hospital" width="96" height="96" />
        <h1>Admin login</h1>
        <p>Manage blog posts, messages, appointments and the gallery.</p>

        {error && (
          <div className="admin-alert admin-alert-error" role="alert">
            <AlertCircle size={16} aria-hidden="true" /> {error}
          </div>
        )}

        <label className="admin-field">
          <span>Email</span>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" required autoFocus />
        </label>
        <label className="admin-field">
          <span>Password</span>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required />
        </label>
        <button className="admin-btn admin-btn-primary admin-btn-block" disabled={busy}>
          <LogIn size={16} aria-hidden="true" /> {busy ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </div>
  )
}

export default Login

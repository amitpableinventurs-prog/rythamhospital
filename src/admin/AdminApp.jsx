import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { api } from '../lib/api'
import AdminLayout from './AdminLayout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Posts from './pages/Posts'
import PostEditor from './pages/PostEditor'
import Inbox from './pages/Inbox'
import GalleryManager from './pages/GalleryManager'
import Settings from './pages/Settings'
import { AdminContext } from './context'
import './admin.css'

const AdminApp = () => {
  const [admin, setAdmin] = useState(undefined) // undefined = checking, null = logged out

  useEffect(() => {
    api.get('/admin/me').then((data) => setAdmin(data.admin)).catch(() => setAdmin(null))
    const onUnauthorized = () => setAdmin(null)
    window.addEventListener('admin:unauthorized', onUnauthorized)
    return () => window.removeEventListener('admin:unauthorized', onUnauthorized)
  }, [])

  const logout = async () => {
    await api.post('/admin/logout').catch(() => {})
    setAdmin(null)
  }

  return (
    <AdminContext.Provider value={{ admin, setAdmin, logout }}>
      <Helmet>
        <title>Admin | Rhythm Hospital</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {admin === undefined ? (
        <div className="admin-boot"><span className="admin-spinner" aria-label="Loading" /></div>
      ) : admin === null ? (
        <Login />
      ) : (
        <Routes>
          <Route element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="posts" element={<Posts />} />
            <Route path="posts/new" element={<PostEditor />} />
            <Route path="posts/:id" element={<PostEditor />} />
            <Route path="messages" element={<Inbox key="messages" type="messages" />} />
            <Route path="appointments" element={<Inbox key="appointments" type="appointments" />} />
            <Route path="gallery" element={<GalleryManager />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Route>
        </Routes>
      )}
    </AdminContext.Provider>
  )
}

export default AdminApp

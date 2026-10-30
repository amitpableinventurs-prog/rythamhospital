import React, { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import {
  LayoutDashboard, FileText, Mail, CalendarCheck, Image, Settings, LogOut, ExternalLink, Menu, X
} from 'lucide-react'
import { useAdmin } from './context'
import logo from '../assets/nav-img.jpeg'

const NAV = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/posts', label: 'Blog Posts', icon: FileText },
  { to: '/admin/messages', label: 'Messages', icon: Mail },
  { to: '/admin/appointments', label: 'Appointments', icon: CalendarCheck },
  { to: '/admin/gallery', label: 'Gallery', icon: Image },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
]

const AdminLayout = () => {
  const { admin, logout } = useAdmin()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="admin-shell">
      <aside className={`admin-sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="admin-brand">
          <img src={logo} alt="" width="40" height="40" />
          <div>
            <strong>Rhythm Hospital</strong>
            <span>Admin panel</span>
          </div>
          <button className="admin-icon-btn admin-menu-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>
        <nav className="admin-nav" aria-label="Admin">
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} className={({ isActive }) => (isActive ? 'active' : '')} onClick={() => setMenuOpen(false)}>
              <Icon size={18} aria-hidden="true" /> {label}
            </NavLink>
          ))}
        </nav>
        <div className="admin-sidebar-footer">
          <a href="/" target="_blank" rel="noopener noreferrer">
            <ExternalLink size={16} aria-hidden="true" /> View website
          </a>
        </div>
      </aside>
      {menuOpen && <div className="admin-backdrop" onClick={() => setMenuOpen(false)} />}

      <div className="admin-main">
        <header className="admin-topbar">
          <button className="admin-icon-btn admin-menu-open" onClick={() => setMenuOpen(true)} aria-label="Open menu">
            <Menu size={22} />
          </button>
          <div className="admin-user">
            <span className="admin-user-avatar" aria-hidden="true">{admin.name.charAt(0)}</span>
            <div>
              <strong>{admin.name}</strong>
              <span>{admin.email}</span>
            </div>
          </div>
          <button className="admin-btn admin-btn-ghost" onClick={logout}>
            <LogOut size={16} aria-hidden="true" /> Log out
          </button>
        </header>
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout

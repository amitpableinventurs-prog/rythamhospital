import React from 'react'
import { Link } from 'react-router-dom'
import { FileText, Mail, CalendarCheck, Image, Eye, Plus, ArrowRight } from 'lucide-react'
import useApi from '../../hooks/useApi'
import { useAdmin, formatDateTime } from '../context'
import { PageHeader, StatusBadge, Alert } from '../components'

const Dashboard = () => {
  const { admin } = useAdmin()
  const { data, error, loading } = useApi('/admin/stats')

  const cards = data
    ? [
        { label: 'Published posts', value: data.posts.published, note: `${data.posts.drafts} drafts`, icon: FileText, to: '/admin/posts' },
        { label: 'Article views', value: data.posts.views.toLocaleString('en-IN'), note: 'all time', icon: Eye, to: '/admin/posts' },
        { label: 'Unread messages', value: data.messages.unread, note: `${data.messages.total} total`, icon: Mail, to: '/admin/messages' },
        { label: 'Pending appointments', value: data.appointments.pending, note: `${data.appointments.total} total`, icon: CalendarCheck, to: '/admin/appointments' },
        { label: 'Gallery photos', value: data.gallery.total, note: data.gallery.total ? 'uploaded' : 'none yet', icon: Image, to: '/admin/gallery' },
      ]
    : []

  return (
    <>
      <PageHeader title={`Welcome back, ${admin.name.split(' ')[0]}`} description="Here's what's happening on the website.">
        <Link to="/admin/posts/new" className="admin-btn admin-btn-primary"><Plus size={16} /> New blog post</Link>
      </PageHeader>

      <Alert>{error?.message}</Alert>

      <div className="admin-stats">
        {loading && [0, 1, 2, 3, 4].map((i) => <div key={i} className="admin-stat admin-skeleton" />)}
        {cards.map(({ label, value, note, icon: Icon, to }) => (
          <Link key={label} to={to} className="admin-stat">
            <span className="admin-stat-icon"><Icon size={20} aria-hidden="true" /></span>
            <strong>{value}</strong>
            <span>{label}</span>
            <small>{note}</small>
          </Link>
        ))}
      </div>

      {data && (
        <div className="admin-grid-2">
          <section className="admin-card">
            <div className="admin-card-header">
              <h2>Latest messages</h2>
              <Link to="/admin/messages">View all <ArrowRight size={14} /></Link>
            </div>
            {data.recentMessages.length === 0 ? (
              <p className="admin-muted">No messages yet.</p>
            ) : (
              <ul className="admin-recent">
                {data.recentMessages.map((m) => (
                  <li key={m.id}>
                    <div>
                      <strong>{m.name}</strong>
                      <span>{m.subject}</span>
                    </div>
                    <div className="admin-recent-meta">
                      <StatusBadge status={m.status} />
                      <small>{formatDateTime(m.createdAt)}</small>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="admin-card">
            <div className="admin-card-header">
              <h2>Latest appointment requests</h2>
              <Link to="/admin/appointments">View all <ArrowRight size={14} /></Link>
            </div>
            {data.recentAppointments.length === 0 ? (
              <p className="admin-muted">No appointment requests yet.</p>
            ) : (
              <ul className="admin-recent">
                {data.recentAppointments.map((a) => (
                  <li key={a.id}>
                    <div>
                      <strong>{a.name}</strong>
                      <span>{a.department} &middot; {a.date}</span>
                    </div>
                    <div className="admin-recent-meta">
                      <StatusBadge status={a.status} />
                      <small>{formatDateTime(a.createdAt)}</small>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      )}
    </>
  )
}

export default Dashboard

import React, { useState } from 'react'
import { Mail, Phone, Trash2, ChevronDown, CalendarCheck, Inbox as InboxIcon, MessageCircle } from 'lucide-react'
import useApi from '../../hooks/useApi'
import { api } from '../../lib/api'
import { formatDateTime } from '../context'
import { PageHeader, StatusBadge, EmptyState, Alert } from '../components'

const formatDay = (date) =>
  new Date(`${date}T00:00:00`).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })

const CONFIG = {
  messages: {
    title: 'Contact messages',
    description: 'Messages sent from the contact form.',
    statuses: ['new', 'read', 'replied'],
    icon: InboxIcon,
    empty: 'No messages yet.',
    summary: (item) => item.subject,
    replySubject: (item) => `Re: ${item.subject}`,
  },
  appointments: {
    title: 'Appointment requests',
    description: 'Requests from the "Book an Appointment" forms. Call the patient to confirm, then update the status.',
    statuses: ['pending', 'confirmed', 'completed', 'cancelled'],
    icon: CalendarCheck,
    empty: 'No appointment requests yet.',
    summary: (item) => `${item.department} · preferred ${formatDay(item.date)}`,
    replySubject: (item) => `Your ${item.department} appointment at Rhythm Hospital`,
  },
}

const whatsappLink = (phone) => {
  const digits = phone.replace(/\D/g, '')
  return `https://wa.me/${digits.length === 10 ? `91${digits}` : digits}`
}

const Inbox = ({ type }) => {
  const config = CONFIG[type]
  const [filter, setFilter] = useState('')
  const [openId, setOpenId] = useState(null)
  const [actionError, setActionError] = useState('')
  const { data, error, loading, reload } = useApi(`/admin/${type}`, { status: filter })
  const items = data?.items || []

  const updateStatus = async (item, status) => {
    try {
      await api.patch(`/admin/${type}/${item.id}`, { status })
      reload()
    } catch (err) {
      setActionError(err.message)
    }
  }

  const toggle = (item) => {
    const opening = openId !== item.id
    setOpenId(opening ? item.id : null)
    // Opening a new message marks it as read.
    if (opening && type === 'messages' && item.status === 'new') updateStatus(item, 'read')
  }

  const remove = async (item) => {
    if (!window.confirm(`Delete this entry from ${item.name}? This cannot be undone.`)) return
    try {
      await api.delete(`/admin/${type}/${item.id}`)
      reload()
    } catch (err) {
      setActionError(err.message)
    }
  }

  return (
    <>
      <PageHeader title={config.title} description={config.description} />

      <div className="admin-toolbar">
        <div className="admin-tabs" role="group" aria-label="Filter by status">
          {['', ...config.statuses].map((s) => (
            <button key={s} className={filter === s ? 'active' : ''} onClick={() => setFilter(s)} aria-pressed={filter === s}>
              {s || 'All'}
            </button>
          ))}
        </div>
      </div>

      <Alert>{error?.message || actionError}</Alert>

      {loading && !data ? (
        <div className="admin-card admin-skeleton" style={{ height: 240 }} />
      ) : items.length === 0 ? (
        <EmptyState icon={config.icon} title={filter ? `Nothing marked "${filter}"` : config.empty} />
      ) : (
        <ul className="admin-inbox">
          {items.map((item) => {
            const open = openId === item.id
            return (
              <li key={item.id} className={`admin-inbox-item ${open ? 'open' : ''} ${item.status === 'new' || item.status === 'pending' ? 'unread' : ''}`}>
                <button className="admin-inbox-summary" onClick={() => toggle(item)} aria-expanded={open}>
                  <span className="admin-inbox-avatar" aria-hidden="true">{item.name.charAt(0).toUpperCase()}</span>
                  <span className="admin-inbox-text">
                    <strong>{item.name}</strong>
                    <span>{config.summary(item)}</span>
                  </span>
                  <span className="admin-inbox-meta">
                    <StatusBadge status={item.status} />
                    <small>{formatDateTime(item.createdAt)}</small>
                  </span>
                  <ChevronDown size={18} className="admin-inbox-chevron" aria-hidden="true" />
                </button>

                {open && (
                  <div className="admin-inbox-detail">
                    <dl className="admin-details">
                      <div><dt>Email</dt><dd><a href={`mailto:${item.email}`}>{item.email}</a></dd></div>
                      <div><dt>Phone</dt><dd><a href={`tel:${item.phone.replace(/\s/g, '')}`}>{item.phone}</a></dd></div>
                      {type === 'appointments' && (
                        <>
                          <div><dt>Department</dt><dd>{item.department}</dd></div>
                          <div><dt>Preferred date</dt><dd>{formatDay(item.date)}</dd></div>
                        </>
                      )}
                      <div><dt>Received</dt><dd>{formatDateTime(item.createdAt)}</dd></div>
                    </dl>
                    {item.message && <p className="admin-message-body">{item.message}</p>}

                    <div className="admin-inbox-actions">
                      <a className="admin-btn admin-btn-primary" href={`mailto:${item.email}?subject=${encodeURIComponent(config.replySubject(item))}`}>
                        <Mail size={16} /> Reply by email
                      </a>
                      <a className="admin-btn admin-btn-ghost" href={`tel:${item.phone.replace(/\s/g, '')}`}>
                        <Phone size={16} /> Call
                      </a>
                      <a className="admin-btn admin-btn-ghost" href={whatsappLink(item.phone)} target="_blank" rel="noopener noreferrer">
                        <MessageCircle size={16} /> WhatsApp
                      </a>
                      <label className="admin-inline-select">
                        <span>Status</span>
                        <select value={item.status} onChange={(e) => updateStatus(item, e.target.value)}>
                          {config.statuses.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </label>
                      <button className="admin-btn admin-btn-danger" onClick={() => remove(item)}>
                        <Trash2 size={16} /> Delete
                      </button>
                    </div>
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </>
  )
}

export default Inbox

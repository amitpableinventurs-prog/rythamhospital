import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Search, Pencil, Trash2, ExternalLink, FileText } from 'lucide-react'
import useApi from '../../hooks/useApi'
import { api } from '../../lib/api'
import { coverFor } from '../../lib/blog'
import { formatDateTime } from '../context'
import { PageHeader, StatusBadge, EmptyState, Alert } from '../components'

const Posts = () => {
  const [status, setStatus] = useState('')
  const [q, setQ] = useState('')
  const { data, error, loading, reload } = useApi('/admin/posts', { status, q })
  const [actionError, setActionError] = useState('')

  const remove = async (post) => {
    if (!window.confirm(`Delete "${post.title}"? This cannot be undone.`)) return
    try {
      await api.delete(`/admin/posts/${post.id}`)
      reload()
    } catch (err) {
      setActionError(err.message)
    }
  }

  const posts = data?.items || []

  return (
    <>
      <PageHeader title="Blog posts" description="Articles appear on the website's Health Blog as soon as they are published.">
        <Link to="/admin/posts/new" className="admin-btn admin-btn-primary"><Plus size={16} /> New post</Link>
      </PageHeader>

      <div className="admin-toolbar">
        <label className="admin-search">
          <Search size={16} aria-hidden="true" />
          <input type="search" placeholder="Search title, category or author" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search posts" />
        </label>
        <div className="admin-tabs" role="group" aria-label="Filter by status">
          {[['', 'All'], ['published', 'Published'], ['draft', 'Drafts']].map(([value, label]) => (
            <button key={value} className={status === value ? 'active' : ''} onClick={() => setStatus(value)} aria-pressed={status === value}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <Alert>{error?.message || actionError}</Alert>

      {loading && !data ? (
        <div className="admin-card admin-skeleton" style={{ height: 240 }} />
      ) : posts.length === 0 ? (
        <EmptyState icon={FileText} title="No posts found">
          {q || status ? 'Try a different search or filter.' : 'Write your first article to get started.'}
        </EmptyState>
      ) : (
        <div className="admin-card admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Article</th>
                <th>Category</th>
                <th>Status</th>
                <th>Views</th>
                <th>Published</th>
                <th><span className="visually-hidden">Actions</span></th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <td>
                    <div className="admin-post-cell">
                      <img src={coverFor(post)} alt="" width="64" height="40" />
                      <div>
                        <Link to={`/admin/posts/${post.id}`} className="admin-strong-link">{post.title}</Link>
                        <small>by {post.author}</small>
                      </div>
                    </div>
                  </td>
                  <td>{post.category}</td>
                  <td><StatusBadge status={post.status} /></td>
                  <td>{post.views.toLocaleString('en-IN')}</td>
                  <td className="admin-nowrap">{post.publishedAt ? formatDateTime(post.publishedAt) : '—'}</td>
                  <td>
                    <div className="admin-row-actions">
                      {post.status === 'published' && (
                        <a href={`/blogs/${post.slug}`} target="_blank" rel="noopener noreferrer" className="admin-icon-btn" aria-label={`View "${post.title}" on the website`}>
                          <ExternalLink size={16} />
                        </a>
                      )}
                      <Link to={`/admin/posts/${post.id}`} className="admin-icon-btn" aria-label={`Edit "${post.title}"`}>
                        <Pencil size={16} />
                      </Link>
                      <button className="admin-icon-btn danger" onClick={() => remove(post)} aria-label={`Delete "${post.title}"`}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}

export default Posts

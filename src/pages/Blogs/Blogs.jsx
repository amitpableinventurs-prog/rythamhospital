import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BookOpen, Search, ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react'
import Seo from '../../components/Seo/Seo'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import BlogCard, { BlogCardSkeleton } from '../../components/BlogCard/BlogCard'
import useApi from '../../hooks/useApi'
import './Blogs.css'

const PAGE_SIZE = 9

const BlogsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const category = searchParams.get('category') || ''
  const query = searchParams.get('q') || ''
  const page = Math.max(parseInt(searchParams.get('page'), 10) || 1, 1)
  const [searchText, setSearchText] = useState(query)

  const { data, error, loading, reload } = useApi('/posts', { category, q: query, page, limit: PAGE_SIZE })
  const posts = data?.items || []
  const categories = data?.categories || []
  const totalPosts = categories.reduce((sum, c) => sum + c.count, 0)

  const updateParams = (changes) => {
    const next = new URLSearchParams(searchParams)
    Object.entries(changes).forEach(([key, value]) => (value ? next.set(key, value) : next.delete(key)))
    setSearchParams(next)
  }

  // Search as the visitor types, after a short pause.
  useEffect(() => {
    if (searchText.trim() === query) return undefined
    const timer = setTimeout(() => updateParams({ q: searchText.trim(), page: '' }), 400)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText])

  const goToPage = (next) => {
    updateParams({ page: next > 1 ? String(next) : '' })
    document.getElementById('articles')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Search result pages shouldn't be indexed; filtered views canonicalise to /blogs. */}
      <Seo path="/blogs" noindex={Boolean(query)} />

      <Breadcrumb title="Health Blog" items={[{ label: 'Blog' }]} />

      <section className="blogs-page section-padding" id="articles">
        <div className="container">
          <motion.div
            className="blogs-page-header"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="blogs-page-badge">
              <BookOpen size={14} aria-hidden="true" />
              Our Health Blog
            </div>
            <h2 className="blogs-page-title">
              Expert <span>Health Insights</span> &amp; Tips
            </h2>
            <p className="blogs-page-subtitle">
              Stay informed with the latest medical advice, wellness tips, and health
              stories from our team of experienced doctors.
            </p>
          </motion.div>

          <div className="blogs-toolbar">
            <label className="blogs-search">
              <Search size={18} aria-hidden="true" />
              <span className="visually-hidden">Search articles</span>
              <input
                type="search"
                placeholder="Search articles..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </label>

            <div className="blogs-filter-tabs" role="group" aria-label="Filter by category">
              <button
                className={`filter-tab ${!category ? 'active' : ''}`}
                aria-pressed={!category}
                onClick={() => updateParams({ category: '', page: '' })}
              >
                All {totalPosts > 0 && <span className="filter-count">{totalPosts}</span>}
              </button>
              {categories.map((c) => (
                <button
                  key={c.category}
                  className={`filter-tab ${category === c.category ? 'active' : ''}`}
                  aria-pressed={category === c.category}
                  onClick={() => updateParams({ category: c.category, page: '' })}
                >
                  {c.category} <span className="filter-count">{c.count}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="blogs-page-grid" aria-live="polite" aria-busy={loading}>
            {loading && Array.from({ length: 6 }, (_, i) => <BlogCardSkeleton key={i} />)}

            {!loading && error && (
              <div className="blogs-no-results">
                <RefreshCw size={44} aria-hidden="true" />
                <h3>We couldn&rsquo;t load the articles</h3>
                <p>{error.message}</p>
                <button className="btn-secondary" onClick={reload}>Try again</button>
              </div>
            )}

            {!loading && !error && posts.length === 0 && (
              <div className="blogs-no-results">
                <Search size={44} aria-hidden="true" />
                <h3>No articles found</h3>
                <p>Try a different search term or category.</p>
              </div>
            )}

            {!loading && !error && posts.map((post, index) => (
              <BlogCard key={post.id} post={post} eager={index < 3} />
            ))}
          </div>

          {!loading && data?.pages > 1 && (
            <nav className="blogs-pagination" aria-label="Blog pages">
              <button onClick={() => goToPage(page - 1)} disabled={page <= 1} aria-label="Previous page">
                <ChevronLeft size={18} />
              </button>
              {Array.from({ length: data.pages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  className={n === page ? 'active' : ''}
                  aria-current={n === page ? 'page' : undefined}
                  onClick={() => goToPage(n)}
                >
                  {n}
                </button>
              ))}
              <button onClick={() => goToPage(page + 1)} disabled={page >= data.pages} aria-label="Next page">
                <ChevronRight size={18} />
              </button>
            </nav>
          )}
        </div>
      </section>
    </>
  )
}

export default BlogsPage

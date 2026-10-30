import React from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { coverFor, formatDate } from '../../lib/blog'
import './BlogCard.css'

/** Article preview card. The whole card is clickable via the title link. */
const BlogCard = ({ post, headingLevel = 3, eager = false }) => {
  const Heading = `h${headingLevel}`
  const url = `/blogs/${post.slug}`

  return (
    <article className="post-card">
      <div className="post-card-media media-frame">
        <img
          src={coverFor(post)}
          alt={post.coverImage ? post.coverAlt : ''}
          width="640"
          height="400"
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
        />
        <span className="post-card-category">{post.category}</span>
      </div>

      <div className="post-card-body">
        <div className="post-card-meta">
          <span>
            <Calendar size={13} aria-hidden="true" />
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          </span>
          <span>
            <Clock size={13} aria-hidden="true" />
            {post.readingTime} min read
          </span>
        </div>

        <Heading className="post-card-title">
          <Link to={url} className="post-card-link">{post.title}</Link>
        </Heading>
        <p className="post-card-excerpt">{post.excerpt}</p>

        <div className="post-card-footer">
          <span className="post-card-author">{post.author}</span>
          <span className="post-card-more" aria-hidden="true">
            Read article <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </article>
  )
}

export const BlogCardSkeleton = () => (
  <div className="post-card post-card-skeleton" aria-hidden="true">
    <div className="post-card-media" />
    <div className="post-card-body">
      <span className="skeleton-line short" />
      <span className="skeleton-line" />
      <span className="skeleton-line" />
      <span className="skeleton-line medium" />
    </div>
  </div>
)

export default BlogCard

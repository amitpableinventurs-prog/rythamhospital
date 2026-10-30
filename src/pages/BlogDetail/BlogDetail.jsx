import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  Calendar, Clock, Eye, User, CheckCircle2, Lightbulb, AlertTriangle, ShieldAlert,
  ChevronDown, ChevronRight, Home, MessageCircle, Link2, Check, PhoneCall, RefreshCw
} from 'lucide-react'
import Seo from '../../components/Seo/Seo'
import BlogCard from '../../components/BlogCard/BlogCard'
import NotFound from '../NotFound/NotFound'
import useApi from '../../hooks/useApi'
import { coverFor, formatDate, initialsOf } from '../../lib/blog'
import { SITE, absoluteUrl, articleSchema, breadcrumbSchema } from '../../lib/seo'
import './BlogDetail.css'

const LIST_SECTIONS = [
  { key: 'symptoms', title: 'Common Symptoms' },
  { key: 'causes', title: 'Causes' },
  { key: 'riskFactors', title: 'Risk Factors' },
  { key: 'prevention', title: 'Prevention Tips' },
]

const BulletList = ({ items, ordered = false }) => {
  if (!items?.length) return null
  if (ordered) {
    return (
      <ol className="ad-numbered-list">
        {items.map((item, i) => <li key={i}>{item}</li>)}
      </ol>
    )
  }
  return (
    <ul className="ad-bullet-list">
      {items.map((item, i) => (
        <li key={i}>
          <CheckCircle2 size={16} className="ad-bullet-icon" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

const AuthorAvatar = ({ details, name, className }) =>
  details?.photo ? (
    <img src={details.photo} alt="" className={`${className} ad-avatar-photo`} width="56" height="56" loading="lazy" />
  ) : (
    <span className={className} aria-hidden="true">{initialsOf(name)}</span>
  )

const BlogDetail = () => {
  const { slug } = useParams()
  const { data, error, loading, reload } = useApi(`/posts/${encodeURIComponent(slug)}`)
  const [openFaq, setOpenFaq] = useState(0)
  const [copied, setCopied] = useState(false)

  if (loading) return <ArticleSkeleton />
  if (error?.status === 404) return <NotFound />
  if (error) {
    return (
      <section className="ad-error section-padding">
        <div className="container">
          <RefreshCw size={44} aria-hidden="true" />
          <h1>We couldn&rsquo;t load this article</h1>
          <p>{error.message}</p>
          <button className="btn-primary" onClick={reload}>Try again</button>
        </div>
      </section>
    )
  }

  const { post, related } = data
  const c = post.content || {}
  const url = `/blogs/${post.slug}`
  const shareUrl = absoluteUrl(url)
  const crumbs = [{ label: 'Blog', path: '/blogs' }, { label: post.title }]

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard unavailable (e.g. insecure context) - nothing else to do.
    }
  }

  return (
    <>
      <Seo
        path={url}
        type="article"
        title={`${post.metaTitle || post.title} | ${SITE.name}`}
        description={post.metaDescription || post.excerpt}
        image={post.coverImage}
        imageAlt={post.coverAlt}
        publishedTime={post.publishedAt}
        modifiedTime={post.updatedAt}
        jsonLd={[articleSchema(post), breadcrumbSchema(crumbs)]}
      />

      <article className="article-detail">
        <header className="ad-hero">
          <div className="container">
            <nav aria-label="Breadcrumb">
              <ol className="ad-breadcrumb">
                <li><Link to="/"><Home size={14} aria-hidden="true" /> Home</Link></li>
                <li><ChevronRight size={14} aria-hidden="true" /><Link to="/blogs">Blog</Link></li>
                <li>
                  <ChevronRight size={14} aria-hidden="true" />
                  <Link to={`/blogs?category=${encodeURIComponent(post.category)}`}>{post.category}</Link>
                </li>
              </ol>
            </nav>

            <h1 className="ad-title">{post.title}</h1>
            <p className="ad-lead">{post.excerpt}</p>

            <div className="ad-byline">
              <AuthorAvatar details={post.authorDetails} name={post.author} className="ad-avatar" />
              <div>
                <p className="ad-author-name">{post.author}</p>
                {post.authorDetails?.specialization && (
                  <p className="ad-author-role">{post.authorDetails.specialization}</p>
                )}
              </div>
              <ul className="ad-meta">
                <li>
                  <Calendar size={14} aria-hidden="true" />
                  <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                </li>
                <li><Clock size={14} aria-hidden="true" /> {post.readingTime} min read</li>
                <li><Eye size={14} aria-hidden="true" /> {post.views.toLocaleString('en-IN')} views</li>
              </ul>
            </div>
          </div>
        </header>

        <div className="container">
          <figure className="ad-cover media-frame">
            <img
              src={coverFor(post)}
              alt={post.coverImage ? post.coverAlt : ''}
              width="1200"
              height="600"
              fetchPriority="high"
              decoding="async"
            />
          </figure>

          <div className="ad-layout">
            <div className="ad-body">
              {c.introduction && (
                <section className="ad-section">
                  <h2>Introduction</h2>
                  <p>{c.introduction}</p>
                </section>
              )}

              {c.whyItMatters && (
                <section className="ad-section">
                  <h2>Why This Topic Matters</h2>
                  <blockquote className="ad-quote">{c.whyItMatters}</blockquote>
                </section>
              )}

              {LIST_SECTIONS.map(({ key, title }) =>
                c[key]?.length > 0 ? (
                  <section className="ad-section" key={key}>
                    <h2>{title}</h2>
                    <BulletList items={c[key]} />
                  </section>
                ) : null
              )}

              {c.healthTips?.length > 0 && (
                <aside className="ad-box ad-box-tips">
                  <p className="ad-box-title"><Lightbulb size={18} aria-hidden="true" /> Healthy Lifestyle Tips</p>
                  <ul className="ad-box-list">
                    {c.healthTips.map((tip, i) => <li key={i}>{tip}</li>)}
                  </ul>
                </aside>
              )}

              {c.treatment?.length > 0 && (
                <section className="ad-section">
                  <h2>Treatment Options</h2>
                  <BulletList items={c.treatment} ordered />
                </section>
              )}

              {c.lifestyle?.length > 0 && (
                <section className="ad-section">
                  <h2>Lifestyle Recommendations</h2>
                  <BulletList items={c.lifestyle} />
                </section>
              )}

              {c.whenToConsult && (
                <aside className="ad-box ad-box-note">
                  <p className="ad-box-title"><AlertTriangle size={18} aria-hidden="true" /> When to Consult a Doctor</p>
                  <p className="ad-box-text">{c.whenToConsult}</p>
                </aside>
              )}

              {c.faqs?.length > 0 && (
                <section className="ad-section">
                  <h2>Frequently Asked Questions</h2>
                  <div className="ad-faq-list">
                    {c.faqs.map((faq, i) => {
                      const open = openFaq === i
                      return (
                        <div className={`ad-faq-item ${open ? 'open' : ''}`} key={i}>
                          <h3>
                            <button
                              className="ad-faq-question"
                              onClick={() => setOpenFaq(open ? -1 : i)}
                              aria-expanded={open}
                              aria-controls={`faq-answer-${i}`}
                            >
                              <span>{faq.q}</span>
                              <ChevronDown size={16} className="ad-faq-chevron" aria-hidden="true" />
                            </button>
                          </h3>
                          {/* Answers stay in the DOM (hidden) so search engines can read them. */}
                          <p className="ad-faq-answer" id={`faq-answer-${i}`} hidden={!open}>{faq.a}</p>
                        </div>
                      )
                    })}
                  </div>
                </section>
              )}

              {c.conclusion && (
                <section className="ad-section">
                  <h2>Conclusion</h2>
                  <p>{c.conclusion}</p>
                </section>
              )}

              <aside className="ad-box ad-box-warning">
                <p className="ad-box-title"><ShieldAlert size={18} aria-hidden="true" /> Medical Disclaimer</p>
                <p className="ad-box-text">
                  This article is intended for educational purposes only and should not replace
                  professional medical advice. Always consult a qualified healthcare provider
                  before making healthcare decisions.
                </p>
              </aside>

              <div className="ad-share">
                <span className="ad-share-label">Share this article:</span>
                <div className="ad-share-buttons">
                  <a className="ad-share-btn fb" aria-label="Share on Facebook" target="_blank" rel="noopener noreferrer"
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}>f</a>
                  <a className="ad-share-btn x" aria-label="Share on X" target="_blank" rel="noopener noreferrer"
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`}>X</a>
                  <a className="ad-share-btn li" aria-label="Share on LinkedIn" target="_blank" rel="noopener noreferrer"
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}>in</a>
                  <a className="ad-share-btn wa" aria-label="Share on WhatsApp" target="_blank" rel="noopener noreferrer"
                    href={`https://wa.me/?text=${encodeURIComponent(`${post.title} ${shareUrl}`)}`}>
                    <MessageCircle size={16} />
                  </a>
                  <button className="ad-share-btn copy" aria-label={copied ? 'Link copied' : 'Copy link'} onClick={copyLink}>
                    {copied ? <Check size={16} /> : <Link2 size={16} />}
                  </button>
                </div>
              </div>
            </div>

            <aside className="ad-sidebar" aria-label="About this article">
              {post.authorDetails && (
                <div className="ad-side-card ad-doctor">
                  <p className="ad-side-title">Written by</p>
                  <AuthorAvatar details={post.authorDetails} name={post.author} className="ad-doctor-avatar" />
                  <p className="ad-doctor-name">{post.author}</p>
                  {post.authorDetails.qualification && <p className="ad-doctor-line">{post.authorDetails.qualification}</p>}
                  {post.authorDetails.specialization && <p className="ad-doctor-line">{post.authorDetails.specialization}</p>}
                  {post.authorDetails.experience && <p className="ad-doctor-exp">{post.authorDetails.experience}</p>}
                </div>
              )}

              <div className="ad-side-card ad-side-cta">
                <p className="ad-side-title">Need medical advice?</p>
                <p>Our specialists are here to help. Book a consultation today.</p>
                <Link to="/contact#appointment" className="btn-primary"><Calendar size={16} /> Book Appointment</Link>
                <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer" className="ad-whatsapp">
                  <PhoneCall size={16} /> Chat on WhatsApp
                </a>
              </div>

              <div className="ad-side-card">
                <p className="ad-side-title">Article details</p>
                <ul className="ad-stats">
                  <li><span><Clock size={14} aria-hidden="true" /> Reading time</span><strong>{post.readingTime} min</strong></li>
                  <li><span><Calendar size={14} aria-hidden="true" /> Published</span><strong>{formatDate(post.publishedAt)}</strong></li>
                  {post.updatedAt && (
                    <li><span><RefreshCw size={14} aria-hidden="true" /> Updated</span><strong>{formatDate(post.updatedAt)}</strong></li>
                  )}
                  <li><span><User size={14} aria-hidden="true" /> Category</span><strong>{post.category}</strong></li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </article>

      {related?.length > 0 && (
        <section className="ad-related section-padding" aria-labelledby="related-title">
          <div className="container">
            <div className="section-header">
              <span className="section-subtitle">Keep Reading</span>
              <h2 className="section-title" id="related-title">Related Articles</h2>
            </div>
            <div className="ad-related-grid">
              {related.map((item) => <BlogCard key={item.id} post={item} />)}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

const ArticleSkeleton = () => (
  <div className="ad-skeleton" aria-busy="true" aria-label="Loading article">
    <div className="ad-hero">
      <div className="container">
        <span className="skeleton-line short" />
        <span className="skeleton-line title" />
        <span className="skeleton-line medium" />
      </div>
    </div>
    <div className="container">
      <div className="ad-cover skeleton-block" />
    </div>
  </div>
)

export default BlogDetail

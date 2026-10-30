import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import BlogCard, { BlogCardSkeleton } from '../../components/BlogCard/BlogCard'
import useApi from '../../hooks/useApi'
import './BlogSection.css'

const BlogSection = () => {
  const { data, error, loading } = useApi('/posts', { limit: 3 })
  const posts = data?.items || []

  // Nothing to show (API offline or no posts yet): leave the section out.
  if (!loading && (error || posts.length === 0)) return null

  return (
    <section className="blog-section section-padding" aria-labelledby="blog-section-title">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-subtitle">Latest Blog</span>
          <h2 className="section-title" id="blog-section-title">Health Tips & Updates</h2>
          <p className="section-desc">
            Stay informed with the latest health tips, medical news, and wellness advice from our experts.
          </p>
        </motion.div>

        <div className="blog-grid">
          {loading
            ? [0, 1, 2].map((i) => <BlogCardSkeleton key={i} />)
            : posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <BlogCard post={post} />
                </motion.div>
              ))}
        </div>

        <div className="blog-cta">
          <Link to="/blogs" className="btn-primary">
            View All Articles
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default BlogSection

import React from 'react'
import { Link } from 'react-router-dom'
import { Home, Phone, BookOpen } from 'lucide-react'
import Seo from '../../components/Seo/Seo'
import { NOT_FOUND_META, SITE } from '../../../shared/site.js'
import './NotFound.css'

const NotFound = () => (
  <>
    <Seo title={NOT_FOUND_META.title} description={NOT_FOUND_META.description} noindex />
    <section className="not-found section-padding">
      <div className="container">
        <span className="not-found-code" aria-hidden="true">404</span>
        <h1>We couldn&rsquo;t find that page</h1>
        <p>
          The page may have moved or no longer exists. Try one of these instead, or call us on{' '}
          <a href={`tel:${SITE.phones[0].replace(/\s/g, '')}`}>{SITE.phones[0]}</a>.
        </p>
        <div className="not-found-actions">
          <Link to="/" className="btn-primary"><Home size={16} /> Go to homepage</Link>
          <Link to="/contact" className="btn-secondary"><Phone size={16} /> Contact us</Link>
          <Link to="/blogs" className="btn-secondary"><BookOpen size={16} /> Health blog</Link>
        </div>
      </div>
    </section>
  </>
)

export default NotFound

import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { ChevronRight, Home } from 'lucide-react'
import { breadcrumbSchema } from '../../lib/seo'
import './Breadcrumb.css'

const Breadcrumb = ({ title, items }) => {
  return (
    <section className="breadcrumb-section">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema(items || [])).replace(/</g, '\\u003c')}
        </script>
      </Helmet>
      <div className="breadcrumb-overlay"></div>
      <div className="container">
        <div className="breadcrumb-content">
          <h1 className="breadcrumb-title">{title}</h1>
          <nav className="breadcrumb-nav" aria-label="Breadcrumb">
            <ol className="breadcrumb-list">
              <li className="breadcrumb-item">
                <Link to="/">
                  <Home size={14} aria-hidden="true" />
                  Home
                </Link>
              </li>
              {items && items.map((item, index) => (
                <li key={index} className="breadcrumb-item">
                  <ChevronRight size={14} aria-hidden="true" />
                  {item.path ? (
                    <Link to={item.path}>{item.label}</Link>
                  ) : (
                    <span className="breadcrumb-current" aria-current="page">{item.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>
    </section>
  )
}

export default Breadcrumb

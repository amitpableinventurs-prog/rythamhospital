import React, { useState, useEffect, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Phone } from 'lucide-react'
import { NAV_LINKS } from '../../utils/constants'
import useStickyHeader from '../../hooks/useStickyHeader'
import './Navbar.css'
import img from "../../assets/nav-img.jpeg"

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const isSticky = useStickyHeader(80)
  const location = useLocation()

  const toggleMobile = useCallback(() => {
    setMobileOpen(prev => !prev)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <header className={`navbar ${isSticky ? 'navbar-sticky' : ''}`}>
      <div className="container">
        <div className="navbar-inner">
          <Link to="/" className="navbar-logo">
            {/* <div className="logo-icon">
              <span className="logo-cross">+</span>
            </div> */}
            <div className="logo-text">
              <img src={img} alt="Rhythm Hospital Logo" className="logo-image" />
            </div>
          </Link>

          <nav className={`navbar-nav ${mobileOpen ? 'active' : ''}`}>
            <div className="mobile-nav-header">
              <Link to="/" className="navbar-logo" onClick={() => setMobileOpen(false)}>
                <div className="logo-icon">
                  <span className="logo-cross">+</span>
                </div>
                <div className="logo-text">
                  <img src={img} alt="Rhythm Hospital Logo" className="logo-image" />
                </div>
              </Link>
              <button className="mobile-close" onClick={toggleMobile} aria-label="Close menu">
                <X size={24} />
              </button>
            </div>
            <ul className="nav-list">
              {NAV_LINKS.map(link => (
                <li key={link.path} className="nav-item">
                  <Link
                    to={link.path}
                    className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mobile-nav-cta">
              <a href=" tel:+91 7869372026   " className="btn-primary">
                <Phone size={16} />
                Call Now
              </a>
            </div>
          </nav>

          {/* <div className="navbar-actions">
            <a href=" tel:+91 7869372026   " className="navbar-cta btn-primary">
              <Phone size={16} />
              <span>Book Appointment</span>
            </a>
            <button className="mobile-toggle" onClick={toggleMobile} aria-label="Toggle menu">
              <Menu size={26} />
            </button>
          </div> */}

            <div className="navbar-actions">
            <a href="/contact" className="navbar-cta btn-primary">
              <Phone size={16} />
              <span>Book Appointment</span>
            </a>
            <button className="mobile-toggle" onClick={toggleMobile} aria-label="Toggle menu">
              <Menu size={26} />
            </button>
          </div>
        </div>
      </div>
      {mobileOpen && <div className="mobile-overlay" onClick={toggleMobile}></div>}
    </header>
  )
}

export default React.memo(Navbar)
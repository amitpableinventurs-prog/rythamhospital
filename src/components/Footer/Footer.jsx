import React from 'react'
import { Link } from 'react-router-dom'
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  Send,
  HeartPulse,
  ChevronRight
} from 'lucide-react'
import SocialLinks from '../SocialLinks/SocialLinks'
import { formatAddress } from '../../../shared/site.js'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-cta-bar">
            <div className="footer-cta-content">
              <h3>Need Emergency Medical Care?</h3>
              <p>Call us now for immediate assistance</p>
            </div>

            <a href=" tel:+91 7869372026   " className="btn-white">
              <Phone size={18} />
              +91 7869372026
            </a>
          </div>
        </div>
      </div>

      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">

            <div className="footer-col footer-about">
              <Link to="/" className="footer-logo">
                <div className="logo-icon">
                  <span className="logo-cross">+</span>
                </div>

                <div className="logo-text">
                  <span className="logo-name" style={{ color: '#fff' }}>
                    Rhythm
                  </span>
                  <span
                    className="logo-tagline"
                    style={{ color: 'rgba(255,255,255,0.6)' }}
                  >
                    Hospital & Research Center
                  </span>
                </div>
              </Link>

              <p className="footer-desc">
                Rhythm Hospital is a leading healthcare institution committed
                to providing world-class medical services with compassion and
                excellence.
              </p>

              <SocialLinks className="footer-social" size={18} />
            </div>

            <div className="footer-col">
              <h4 className="footer-heading">Quick Links</h4>

              <ul className="footer-links">
                <li>
                  <Link to="/about">
                    <ChevronRight size={14} /> About Us
                  </Link>
                </li>

                <li>
                  <Link to="/departments">
                    <ChevronRight size={14} /> Departments
                  </Link>
                </li>

                <li>
                  <Link to="/doctors">
                    <ChevronRight size={14} /> Our Doctors
                  </Link>
                </li>

                <li>
                  <Link to="/gallery">
                    <ChevronRight size={14} /> Gallery
                  </Link>
                </li>

                <li>
                  <Link to="/blogs">
                    <ChevronRight size={14} /> Health Blog
                  </Link>
                </li>

                <li>
                  <Link to="/contact">
                    <ChevronRight size={14} /> Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div className="footer-col">
              <h4 className="footer-heading">Departments</h4>

              <ul className="footer-links">
                <li>
                  <Link to="/departments">
                    <ChevronRight size={14} /> Cardiology
                  </Link>
                </li>

                <li>
                  <Link to="/departments">
                    <ChevronRight size={14} /> Neurology
                  </Link>
                </li>

                <li>
                  <Link to="/departments">
                    <ChevronRight size={14} /> Orthopedics
                  </Link>
                </li>

                <li>
                  <Link to="/departments">
                    <ChevronRight size={14} /> Pediatrics
                  </Link>
                </li>

                <li>
                  <Link to="/departments">
                    <ChevronRight size={14} /> Dermatology
                  </Link>
                </li>

                <li>
                  <Link to="/departments">
                    <ChevronRight size={14} /> Ophthalmology
                  </Link>
                </li>
              </ul>
            </div>

            <div className="footer-col">
              <h4 className="footer-heading">Contact Info</h4>

              <div className="footer-contact">
                <div className="footer-contact-item">
                  <MapPin size={18} />
                  <address className="footer-address">{formatAddress()}</address>
                </div>

                <div className="footer-contact-item">
                  <Phone size={18} />
                  <span>Reception:-+91 7869372026</span>
                </div>

                 <div className="footer-contact-item">
                  <Phone size={18} />
                   <span>Marketing Head:-+91 9232841718</span>
                </div>

                <div className="footer-contact-item">
                  <Mail size={18} />
                  <span>rhythemmultispeciality@gmail.com</span>
                </div>

                <div className="footer-contact-item">
                  <Clock size={18} />
                  <span>Mon - Sat: 9:00 AM - 8:00 PM</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-inner">
            <p>
              © {new Date().getFullYear()} Rhythm Hospital. All Rights Reserved.
            </p>

            <div className="footer-bottom-links">
              <Link to="/privacy-policy">Privacy Policy</Link>
              <Link to="/terms-and-conditions">Terms of Service</Link>
              <a href="/sitemap.xml">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default React.memo(Footer)
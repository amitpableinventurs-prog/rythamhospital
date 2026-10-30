import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Play, Shield, Clock, Award, HeartPulse } from 'lucide-react'
import heroImage from '../../assets/illustrations/hero-doctor.svg'
import './Hero.css'

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-bg-shapes">
        <div className="hero-shape hero-shape-1"></div>
        <div className="hero-shape hero-shape-2"></div>
        <div className="hero-shape hero-shape-3"></div>
      </div>
      <div className="container">
        <div className="hero-grid">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="hero-badge">
              <HeartPulse size={16} />
              <span>Trusted Healthcare Since 2009</span>
            </div>
            <h1 className="hero-title">
              Your Health Is Our
              <span className="hero-title-highlight"> Top Priority</span>
            </h1>
            <p className="hero-desc">
              We provide world-class healthcare services with compassion, expertise,
              and cutting-edge technology. Our team of experienced doctors ensures
              the best medical care for you and your family.
            </p>
            <div className="hero-buttons">
              <Link to="/contact" className="btn-primary">
                Book Appointment
                <ArrowRight size={18} />
              </Link>
              <Link to="/about" className="btn-secondary">
                Learn More
              </Link>
            </div>
            <div className="hero-features">
              <div className="hero-feature">
                <div className="hero-feature-icon">
                  <Shield size={20} />
                </div>
                <div>
                  <strong>Certified</strong>
                  <span>ISO 9001:2015</span>
                </div>
              </div>
              <div className="hero-feature">
                <div className="hero-feature-icon">
                  <Clock size={20} />
                </div>
                <div>
                  <strong>24/7 Support</strong>
                  <span>Emergency Care</span>
                </div>
              </div>
              <div className="hero-feature">
                <div className="hero-feature-icon">
                  <Award size={20} />
                </div>
                <div>
                  <strong>Award Winning</strong>
                  <span>Best Hospital</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="hero-image"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
          >
            <div className="hero-img-wrapper">
              <div className="hero-img-placeholder">
                <img src={heroImage} alt="Rhythm Hospital doctor ready to provide expert medical care" className="hero-img-photo" width="560" height="500" fetchPriority="high" decoding="async" />
              </div>
              <div className="hero-floating-card hero-card-1">
                <div className="floating-icon green">
                  <HeartPulse size={18} />
                </div>
                <div>
                  <strong>5000+</strong>
                  <span>Happy Patients</span>
                </div>
              </div>
              <div className="hero-floating-card hero-card-2">
                <div className="floating-icon blue">
                  <Award size={18} />
                </div>
                <div>
                  <strong>50+</strong>
                  <span>Expert Doctors</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
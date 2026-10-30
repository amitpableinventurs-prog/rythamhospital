import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, Award, Shield, ArrowRight } from 'lucide-react'
import aboutMainImage from '../../assets/illustrations/about-main.svg'
import aboutTeamImage from '../../assets/illustrations/about-team.svg'
import './AboutSection.css'

const AboutSection = () => {
  return (
    <section className="about-section section-padding">
      <div className="container">
        <div className="about-grid">
          <motion.div
            className="about-images"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="about-img-main">
              <div className="about-img-placeholder about-img-1">
                <img src={aboutMainImage} alt="Rhythm Hospital building with ambulance service" className="about-img-photo" width="480" height="380" loading="lazy" decoding="async" />
              </div>
            </div>
            <div className="about-img-secondary">
              <div className="about-img-placeholder about-img-2">
                <img src={aboutTeamImage} alt="Rhythm Hospital expert medical team" className="about-img-photo" width="320" height="220" loading="lazy" decoding="async" />
              </div>
            </div>
            <div className="about-experience-badge">
              <span className="exp-number">15+</span>
              <span className="exp-text">Years of Experience</span>
            </div>
          </motion.div>

          <motion.div
            className="about-content"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="section-subtitle">About Us</span>
            <h2 className="section-title" style={{ textAlign: 'left' }}>
              We Are Dedicated To Your Health & Well-being
            </h2>
            <p className="about-desc">
              Rhythm Hospital has been providing exceptional healthcare services since 2009.
              With a team of over 50 expert doctors and state-of-the-art facilities, we are
              committed to delivering the highest quality medical care.
            </p>
            <p className="about-desc">
              Our mission is to provide affordable, accessible, and compassionate healthcare
              to every patient who walks through our doors.
            </p>

            <div className="about-features">
              <div className="about-feature">
                <Check size={16} />
                <span>Advanced Medical Technology</span>
              </div>
              <div className="about-feature">
                <Check size={16} />
                <span>Expert & Experienced Doctors</span>
              </div>
              <div className="about-feature">
                <Check size={16} />
                <span>24/7 Emergency Services</span>
              </div>
              <div className="about-feature">
                <Check size={16} />
                <span>Affordable Treatment Plans</span>
              </div>
              <div className="about-feature">
                <Check size={16} />
                <span>Patient-Centered Care</span>
              </div>
              <div className="about-feature">
                <Check size={16} />
                <span>Modern Infrastructure</span>
              </div>
            </div>

            <div className="about-mini-cards">
              <div className="about-mini-card">
                <div className="mini-card-icon">
                  <Award size={24} />
                </div>
                <div>
                  <strong>Award Winning</strong>
                  <span>Best Hospital 2024</span>
                </div>
              </div>
              <div className="about-mini-card">
                <div className="mini-card-icon">
                  <Shield size={24} />
                </div>
                <div>
                  <strong>ISO Certified</strong>
                  <span>9001:2015 Quality</span>
                </div>
              </div>
            </div>

            <Link to="/about" className="btn-primary about-btn">
              Learn More About Us
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
import React from 'react'
import { motion } from 'framer-motion'
import { Shield, Clock, Heart, Award, Headphones, ThumbsUp } from 'lucide-react'
import whyChooseImage from '../../assets/illustrations/why-choose.svg'
import './WhyChooseSection.css'

const features = [
  {
    icon: Shield,
    title: 'Certified Doctors',
    desc: 'All our doctors are board-certified and highly experienced in their specialties.'
  },
  {
    icon: Clock,
    title: '24/7 Emergency',
    desc: 'Round-the-clock emergency services with rapid response medical teams.'
  },
  {
    icon: Heart,
    title: 'Patient-Centered',
    desc: 'We put patients first with personalized care and treatment plans.'
  },
  {
    icon: Award,
    title: 'Quality Standards',
    desc: 'ISO certified with international standards of medical care and safety.'
  },
  {
    icon: Headphones,
    title: 'Online Support',
    desc: 'Dedicated support team available for queries and appointment scheduling.'
  },
  {
    icon: ThumbsUp,
    title: 'Best Results',
    desc: 'High success rates and patient satisfaction across all departments.'
  }
]

const WhyChooseSection = () => {
  return (
    <section className="why-choose-section section-padding">
      <div className="container">
        <div className="why-choose-grid">
          <motion.div
            className="why-choose-content"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-subtitle">Why Choose Us</span>
            <h2 className="section-title" style={{ textAlign: 'left' }}>
              Why Patients Trust Rhythm Hospital
            </h2>
            <p className="why-choose-desc">
              We combine expertise, technology, and compassion to deliver healthcare
              that makes a difference. Here's why thousands of patients choose us.
            </p>
            <div className="why-choose-features">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="wc-feature"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                >
                  <div className="wc-feature-icon">
                    <feature.icon size={22} />
                  </div>
                  <div>
                    <h5>{feature.title}</h5>
                    <p>{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="why-choose-image"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="wc-img-placeholder">
              <img src={whyChooseImage} alt="Shield with heartbeat representing safe, trusted care at Rhythm Hospital" className="wc-img-photo" width="560" height="500" loading="lazy" decoding="async" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseSection
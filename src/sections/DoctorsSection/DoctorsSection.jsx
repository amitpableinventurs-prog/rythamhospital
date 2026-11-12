import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import DoctorCard from '../../components/Cards/DoctorCard'
import { DOCTORS } from '../../utils/constants'
import './DoctorsSection.css'

const DoctorsSection = () => {
  return (
    <section className="doctors-section section-padding">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-subtitle">Our Doctors</span>
          <h2 className="section-title">Meet Our Expert Doctors</h2>
          <p className="section-desc">
            Our team of highly qualified and experienced doctors is dedicated to providing
            the best medical care.
          </p>
        </motion.div>

        <div className="doctors-grid">
          {DOCTORS.slice(0, 4).map((doctor, index) => (
            <DoctorCard key={doctor.id} doctor={doctor} index={index} />
          ))}
        </div>

        <motion.div
          className="doctors-cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link to="/doctors" className="btn-primary">
            View All Doctors
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default DoctorsSection
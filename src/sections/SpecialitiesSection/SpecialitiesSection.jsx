import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { getServiceIcon } from '../../utils/serviceIcons'
import ServiceModal from '../../components/ServiceModal/ServiceModal'
import { DEPARTMENTS } from '../../utils/constants'
import './SpecialitiesSection.css'

const SpecialitiesSection = () => {
  const [selectedDept, setSelectedDept] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleLearnMore = (dept) => {
    setSelectedDept(dept)
    setIsModalOpen(true)
  }
  const handleCloseModal = () => setIsModalOpen(false)

  return (
    <section className="specialities-section section-padding">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-subtitle">Specialities</span>
          <h2 className="section-title">Our Medical Departments</h2>
          <p className="section-desc">
            Explore our wide range of medical departments staffed with experienced specialists.
          </p>
        </motion.div>

        <div className="specialities-grid">
          {DEPARTMENTS.map((dept, index) => {
            const Icon = getServiceIcon(dept.icon)
            return (
              <motion.div
                key={dept.id}
                className="speciality-card"
                role="button"
                tabIndex={0}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                onClick={() => handleLearnMore(dept)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleLearnMore(dept)
                }}
              >
                <div
                  className="speciality-icon"
                  style={{ background: `${dept.color}15`, color: dept.color }}
                >
                  <Icon size={28} />
                </div>
                <h4 className="speciality-name">{dept.name}</h4>
                <p className="speciality-desc">{dept.description}</p>
                <span className="speciality-link" style={{ color: dept.color }}>
                  Learn More →
                </span>
              </motion.div>
            )
          })}
        </div>
      </div>

      <ServiceModal
        isOpen={isModalOpen}
        service={selectedDept}
        onClose={handleCloseModal}
      />
    </section>
  )
}

export default SpecialitiesSection

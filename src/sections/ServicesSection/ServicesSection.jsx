import React, { useState } from 'react'
import { motion } from 'framer-motion'
import ServiceCard from '../../components/Cards/ServiceCard'
import ServiceModal from '../../components/ServiceModal/ServiceModal'
import { SERVICES } from '../../utils/constants'
import './ServicesSection.css'

const ServicesSection = () => {
  const [selectedService, setSelectedService] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleLearnMore = (service) => {
    setSelectedService(service)
    setIsModalOpen(true)
  }
  // Keep `selectedService` populated during the exit animation so the
  // content doesn't disappear before the closing transition finishes.
  const handleCloseModal = () => setIsModalOpen(false)

  return (
    <section className="services-section section-padding">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-subtitle">Our Services</span>
          <h2 className="section-title">What We Offer</h2>
          <p className="section-desc">
            We provide comprehensive healthcare services with advanced medical technology
            and experienced professionals dedicated to your well-being.
          </p>
        </motion.div>

        <div className="services-grid">
          {SERVICES.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              onLearnMore={handleLearnMore}
            />
          ))}
        </div>
      </div>

      <ServiceModal
        isOpen={isModalOpen}
        service={selectedService}
        onClose={handleCloseModal}
      />
    </section>
  )
}

export default ServicesSection
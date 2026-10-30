import React from 'react'
import { motion } from 'framer-motion'
import { getServiceIcon } from '../../utils/serviceIcons'
import './ServiceCard.css'

const ServiceCard = ({ service, index, onLearnMore }) => {
  const IconComponent = getServiceIcon(service.icon)

  return (
    <motion.div
      className="service-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="service-card-icon">
        <IconComponent size={32} />
      </div>
      <h4 className="service-card-title">{service.title}</h4>
      <p className="service-card-desc">{service.description}</p>
      <div
        className="service-card-link"
        role="button"
        tabIndex={0}
        onClick={() => onLearnMore && onLearnMore(service)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && onLearnMore) onLearnMore(service)
        }}
      >
        Learn More →
      </div>
    </motion.div>
  )
}

export default React.memo(ServiceCard)
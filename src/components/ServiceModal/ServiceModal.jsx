import React, { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  X, CheckCircle2, Clock, Phone, Calendar, MessageCircle,
  ChevronDown, ArrowDown
} from 'lucide-react'
import { getServiceIcon } from '../../utils/serviceIcons'
import { useModalA11y } from '../../hooks/useModalA11y'
import './ServiceModal.css'

/**
 * ServiceModal
 * ONE reusable popup used for every department (Emergency Care, Cardiology,
 * Neurology, etc). All content is data-driven via the `service` prop, so
 * nothing here is hard-coded to a specific department.
 */
const ServiceModal = ({ isOpen, service, onClose }) => {
  const overlayRef = useRef(null)
  const dialogRef = useModalA11y(isOpen, onClose)
  const [openFaqIndex, setOpenFaqIndex] = useState(0)

  if (!service) return null

  const IconComponent = getServiceIcon(service.icon)
  const title = service.title || service.name
  const whatsappNumber = '919876543210'
  const phoneNumber = '+919876543210'
  const callLabel = service.ctaLabels?.call || 'Call Now'
  const whatsappLabel = service.ctaLabels?.whatsapp || 'WhatsApp'
  const bookLabel = service.ctaLabels?.book || 'Book Appointment'

  const listVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.05 } }
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="service-modal-overlay"
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onMouseDown={(e) => {
            if (e.target === overlayRef.current) onClose()
          }}
        >
          <motion.div
            className="service-modal"
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-modal-title"
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <button className="service-modal-close" onClick={onClose} aria-label="Close popup">
              <X size={20} />
            </button>

            {/* Header */}
            <div className="service-modal-header">
              <div className="service-modal-header-icon">
                <IconComponent size={36} />
              </div>
              <div>
                <h2 id="service-modal-title" className="service-modal-title">
                  {service.titleEmoji && <span className="sm-title-emoji" aria-hidden="true">{service.titleEmoji} </span>}
                  {title}
                </h2>
                {service.tagline && <p className="service-modal-tagline">{service.tagline}</p>}
                {service.shortDescription && (
                  <p className="service-modal-short-desc">{service.shortDescription}</p>
                )}
              </div>
            </div>

            <div className="service-modal-body">
              {/* About */}
              {service.fullDescription && (
                <section className="sm-section">
                  <h3 className="sm-section-title">About</h3>
                  <p className="sm-about-text">{service.fullDescription}</p>
                </section>
              )}

              {/* Services Included */}
              {service.services?.length > 0 && (
                <section className="sm-section">
                  <h3 className="sm-section-title">Services Included</h3>
                  <motion.ul
                    className="sm-check-grid"
                    variants={listVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    {service.services.map((item) => (
                      <motion.li key={item} variants={itemVariants} className="sm-check-item">
                        <CheckCircle2 size={16} className="sm-check-icon" />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </section>
              )}

              {/* Common Conditions */}
              {service.conditions?.length > 0 && (
                <section className="sm-section">
                  <h3 className="sm-section-title">Common Conditions We Treat</h3>
                  <motion.ul
                    className="sm-check-grid"
                    variants={listVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    {service.conditions.map((item) => (
                      <motion.li key={item} variants={itemVariants} className="sm-check-item">
                        <CheckCircle2 size={16} className="sm-check-icon" />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </section>
              )}

              {/* Why Choose Us */}
              {service.whyChooseUs?.length > 0 && (
                <section className="sm-section">
                  <h3 className="sm-section-title">Why Choose Us</h3>
                  <motion.ul
                    className="sm-check-grid"
                    variants={listVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    {service.whyChooseUs.map((item) => (
                      <motion.li key={item} variants={itemVariants} className="sm-check-item">
                        <CheckCircle2 size={16} className="sm-check-icon" />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </section>
              )}

              {/* Facilities */}
              {service.facilities?.length > 0 && (
                <section className="sm-section">
                  <h3 className="sm-section-title">Facilities</h3>
                  <motion.div
                    className="sm-facility-grid"
                    variants={listVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    {service.facilities.map((f) => (
                      <motion.div key={f.label} variants={itemVariants} className="sm-facility-item">
                        <span className="sm-facility-emoji" aria-hidden="true">{f.icon}</span>
                        <span>{f.label}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </section>
              )}

              {/* How It Works */}
              {service.process?.length > 0 && (
                <section className="sm-section">
                  <h3 className="sm-section-title">How It Works</h3>
                  <motion.div
                    className="sm-process"
                    variants={listVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    {service.process.map((step, i) => (
                      <React.Fragment key={step}>
                        <motion.div variants={itemVariants} className="sm-process-step">
                          <span className="sm-process-number">{i + 1}</span>
                          <span>{step}</span>
                        </motion.div>
                        {i < service.process.length - 1 && (
                          <ArrowDown size={16} className="sm-process-arrow" aria-hidden="true" />
                        )}
                      </React.Fragment>
                    ))}
                  </motion.div>
                </section>
              )}

              {/* Department Head */}
              {service.doctor && (
                <section className="sm-section">
                  <h3 className="sm-section-title">Department Head</h3>
                  <div className="sm-doctor-card">
                    {service.doctor.image ? (
                      <img
                        src={service.doctor.image}
                        alt={service.doctor.name}
                        className="sm-doctor-avatar sm-doctor-photo"
                      />
                    ) : (
                      <div className="sm-doctor-avatar">
                        {service.doctor.name?.replace('Dr. ', '').charAt(0)}
                      </div>
                    )}
                    <div>
                      <p className="sm-doctor-name">{service.doctor.name}</p>
                      <p className="sm-doctor-role">{service.doctor.role}</p>
                      {service.doctor.qualifications && (
                        <p className="sm-doctor-qual">{service.doctor.qualifications}</p>
                      )}
                      <p className="sm-doctor-exp">{service.doctor.experience}</p>
                      {service.doctor.specialization && (
                        <p className="sm-doctor-spec">
                          <span>Specialization: </span>{service.doctor.specialization}
                        </p>
                      )}
                    </div>
                  </div>
                </section>
              )}

              {/* Availability */}
              {service.availability && (
                <section className="sm-section">
                  <h3 className="sm-section-title">Availability</h3>
                  <div className="sm-availability">
                    <Clock size={18} className="sm-availability-icon" />
                    <div>
                      <p className="sm-availability-hours">{service.availability.hours}</p>
                      <p className="sm-availability-sub">
                        {service.availability.days} · {service.availability.note}
                      </p>
                    </div>
                  </div>
                </section>
              )}

              {/* Patient Information */}
              {service.patientInfo?.length > 0 && (
                <section className="sm-section">
                  <h3 className="sm-section-title">Patient Information</h3>
                  <p className="sm-bring-label">Please bring:</p>
                  <ul className="sm-plain-list">
                    {service.patientInfo.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Insurance */}
              {service.insurance?.length > 0 && (
                <section className="sm-section">
                  <h3 className="sm-section-title">Insurance</h3>
                  <ul className="sm-check-grid">
                    {service.insurance.map((item) => (
                      <li key={item} className="sm-check-item">
                        <CheckCircle2 size={16} className="sm-check-icon" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* FAQ */}
              {service.faqs?.length > 0 && (
                <section className="sm-section">
                  <h3 className="sm-section-title">FAQ</h3>
                  <div className="sm-faq-list">
                    {service.faqs.map((faq, i) => {
                      const open = openFaqIndex === i
                      return (
                        <div className={`sm-faq-item ${open ? 'open' : ''}`} key={faq.q}>
                          <button
                            className="sm-faq-question"
                            onClick={() => setOpenFaqIndex(open ? -1 : i)}
                            aria-expanded={open}
                          >
                            <span>{faq.q}</span>
                            <ChevronDown size={16} className="sm-faq-chevron" />
                          </button>
                          {open && <p className="sm-faq-answer">{faq.a}</p>}
                        </div>
                      )
                    })}
                  </div>
                </section>
              )}
            </div>

            {/* Bottom CTA */}
            <div className="service-modal-footer">
              <Link to="/contact" className="sm-btn sm-btn-primary" onClick={onClose}>
                <Calendar size={18} />
                {bookLabel}
              </Link>
              <a href={`tel:${phoneNumber}`} className="sm-btn sm-btn-secondary">
                <Phone size={18} />
                {callLabel}
              </a>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="sm-btn sm-btn-whatsapp"
              >
                <MessageCircle size={18} />
                {whatsappLabel}
              </a>
              <button className="sm-btn sm-btn-outline" onClick={onClose}>
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ServiceModal

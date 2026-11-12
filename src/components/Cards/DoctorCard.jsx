import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, CalendarCheck, Clock } from 'lucide-react'
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram
} from 'react-icons/fa'
import './DoctorCard.css'

const SOCIAL_ICONS = { facebook: FaFacebookF, twitter: FaTwitter, linkedin: FaLinkedinIn, instagram: FaInstagram }

const DoctorCard = ({ doctor, index }) => {
  // Only show profiles that have a real URL (placeholders are '#').
  const socials = Object.entries(doctor.social || {}).filter(([, url]) => url && url !== '#')

  return (
    <motion.article
      className="doctor-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="doctor-card-image media-frame">
        {doctor.image ? (
          <img
            src={doctor.image}
            alt={`${doctor.name}, ${doctor.specialty} at Rhythm Hospital`}
            className="doctor-img"
            width="400"
            height="500"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="doctor-img-placeholder">
            <div className="doctor-avatar">
              <span>{doctor.name.replace(/^Dr\.?\s*/, '').charAt(0)}</span>
            </div>
          </div>
        )}

        <span className="doctor-specialty-chip">{doctor.specialty}</span>

        <div className="doctor-hover">
          <Link to="/contact#appointment" className="doctor-book">
            <CalendarCheck size={16} aria-hidden="true" />
            Book appointment
            <span className="visually-hidden"> with {doctor.name}</span>
          </Link>
          {socials.length > 0 && (
            <div className="doctor-social">
              {socials.map(([network, url]) => {
                const Icon = SOCIAL_ICONS[network]
                return Icon ? (
                  <a key={network} href={url} target="_blank" rel="noopener noreferrer" aria-label={`${doctor.name} on ${network}`}>
                    <Icon size={14} />
                  </a>
                ) : null
              })}
            </div>
          )}
        </div>
      </div>

      <div className="doctor-card-info">
        {doctor.rating != null && (
          <div className="doctor-rating" aria-label={`Rated ${doctor.rating} out of 5`}>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                fill={i < Math.round(doctor.rating) ? '#ffc107' : 'none'}
                color="#ffc107"
                aria-hidden="true"
              />
            ))}
            <span aria-hidden="true">{doctor.rating}</span>
          </div>
        )}

        <h3 className="doctor-name">{doctor.name}</h3>
        {doctor.qualification && <p className="doctor-qualification">{doctor.qualification}</p>}
        <p className="doctor-specialty">{doctor.specialty}</p>
        {doctor.experience && <p className="doctor-experience">{doctor.experience} Experience</p>}
        {doctor.opd && (
          <p className="doctor-opd">
            <Clock size={13} aria-hidden="true" />
            <span>OPD: {doctor.opd}</span>
          </p>
        )}
      </div>
    </motion.article>
  )
}

export default React.memo(DoctorCard)

import React from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react'
import useForm from '../../hooks/useForm'
import { FieldError, FormError, FormSuccess, SubmitLabel, Honeypot } from '../../components/FormStatus/FormStatus'
import { SITE, formatAddress } from '../../../shared/site.js'
import './ContactSection.css'

const EMPTY = { name: '', email: '', phone: '', subject: '', message: '', website: '' }
const tel = (phone) => `tel:${phone.replace(/\s/g, '')}`

const ContactSection = () => {
  const form = useForm('/contact', EMPTY)

  return (
    <section className="contact-section section-padding">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-subtitle">Contact Us</span>
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-desc">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </motion.div>

        <div className="contact-grid">
          <motion.address
            className="contact-info-cards"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="contact-info-card">
              <div className="contact-info-icon">
                <Phone size={22} aria-hidden="true" />
              </div>
              <div>
                <h3>Phone Number</h3>
                {SITE.phones.map((phone) => (
                  <p key={phone}><a href={tel(phone)}>{phone}</a></p>
                ))}
              </div>
            </div>
            <div className="contact-info-card">
              <div className="contact-info-icon">
                <Mail size={22} aria-hidden="true" />
              </div>
              <div>
                <h3>Email Address</h3>
                {SITE.emails.map((email) => (
                  <p key={email}><a href={`mailto:${email}`}>{email}</a></p>
                ))}
              </div>
            </div>
            <div className="contact-info-card">
              <div className="contact-info-icon">
                <MapPin size={22} aria-hidden="true" />
              </div>
              <div>
                <h3>Our Location</h3>
                <p>{formatAddress()}</p>
              </div>
            </div>
            <div className="contact-info-card">
              <div className="contact-info-icon">
                <Clock size={22} aria-hidden="true" />
              </div>
              <div>
                <h3>Working Hours</h3>
                <p>{SITE.hours.weekdays}</p>
                <p>{SITE.hours.sunday}</p>
              </div>
            </div>
          </motion.address>

          <motion.div
            className="contact-form-wrapper"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {form.status === 'success' ? (
              <FormSuccess
                title={`Thank you, ${form.values.name.split(' ')[0]}!`}
                onReset={form.reset}
                resetLabel="Send another message"
              >
                Your message has been received. Our team will get back to you within one working day.
              </FormSuccess>
            ) : (
              <form className="contact-form" onSubmit={form.handleSubmit} noValidate>
                <h3>Send Us a Message</h3>
                <FormError form={form} />
                <Honeypot form={form} />

                <div className="contact-form-row">
                  <div>
                    <label className="visually-hidden" htmlFor={form.field('name').id}>Your name</label>
                    <input type="text" placeholder="Your Name" autoComplete="name" required {...form.field('name')} />
                    <FieldError form={form} name="name" />
                  </div>
                  <div>
                    <label className="visually-hidden" htmlFor={form.field('email').id}>Your email</label>
                    <input type="email" placeholder="Your Email" autoComplete="email" required {...form.field('email')} />
                    <FieldError form={form} name="email" />
                  </div>
                </div>
                <div className="contact-form-row">
                  <div>
                    <label className="visually-hidden" htmlFor={form.field('phone').id}>Phone number</label>
                    <input type="tel" placeholder="Phone Number" autoComplete="tel" required {...form.field('phone')} />
                    <FieldError form={form} name="phone" />
                  </div>
                  <div>
                    <label className="visually-hidden" htmlFor={form.field('subject').id}>Subject</label>
                    <input type="text" placeholder="Subject" required {...form.field('subject')} />
                    <FieldError form={form} name="subject" />
                  </div>
                </div>
                <div className="contact-form-message">
                  <label className="visually-hidden" htmlFor={form.field('message').id}>Your message</label>
                  <textarea placeholder="Your Message" rows="5" required {...form.field('message')} />
                  <FieldError form={form} name="message" />
                </div>
                <button type="submit" className="btn-primary" disabled={form.status === 'submitting'}>
                  <SubmitLabel form={form} idle="Send Message" icon={Send} />
                </button>
                <p className="form-privacy-note">
                  We only use your details to respond to your enquiry.
                </p>
              </form>
            )}
          </motion.div>
        </div>

        {SITE.mapEmbedUrl && (
          <div className="contact-map">
            <iframe
              title={`Map showing the location of ${SITE.name}`}
              src={SITE.mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        )}
      </div>
    </section>
  )
}

export default ContactSection

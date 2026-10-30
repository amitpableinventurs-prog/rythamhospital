import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, User, Phone, Mail, MessageSquare, ChevronDown, Send } from 'lucide-react'
import useForm from '../../hooks/useForm'
import { FieldError, FormError, FormSuccess, SubmitLabel, Honeypot } from '../FormStatus/FormStatus'
import { DEPARTMENTS } from '../../utils/constants'
import { SITE } from '../../../shared/site.js'
import './AppointmentForm.css'

const EMPTY = { name: '', email: '', phone: '', department: '', date: '', message: '', website: '' }

// Today's date in the visitor's timezone, formatted for <input type="date" min>.
const today = () => {
  const now = new Date()
  return new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10)
}

const AppointmentForm = () => {
  const form = useForm('/appointments', EMPTY)

  return (
    <section className="appointment-section section-padding" id="appointment">
      <div className="container">
        <div className="appointment-grid">
          <motion.div
            className="appointment-info"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-subtitle">Appointment</span>
            <h2 className="section-title" style={{ textAlign: 'left' }}>
              Book Your Appointment With Our Expert Doctors
            </h2>
            <p className="appointment-desc">
              Schedule an appointment with our experienced doctors. We provide the best
              medical care with state-of-the-art facilities and technology.
            </p>
            <div className="appointment-features">
              <div className="appt-feature">
                <div className="appt-feature-icon">
                  <Calendar size={22} aria-hidden="true" />
                </div>
                <div>
                  <h3>Flexible Scheduling</h3>
                  <p>Choose a time that works best for you</p>
                </div>
              </div>
              <div className="appt-feature">
                <div className="appt-feature-icon">
                  <User size={22} aria-hidden="true" />
                </div>
                <div>
                  <h3>Expert Consultation</h3>
                  <p>Get advice from experienced specialists</p>
                </div>
              </div>
              <div className="appt-feature">
                <div className="appt-feature-icon">
                  <Phone size={22} aria-hidden="true" />
                </div>
                <div>
                  <h3>24/7 Support</h3>
                  <p>Round the clock customer assistance</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="appointment-form-wrapper"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {form.status === 'success' ? (
              <FormSuccess
                title="Appointment request received"
                onReset={form.reset}
                resetLabel="Book another appointment"
              >
                Thank you, {form.values.name.split(' ')[0]}. Our team will call you on {form.values.phone} to
                confirm your {form.values.department} appointment. For emergencies call {SITE.phones[0]}.
              </FormSuccess>
            ) : (
              <form className="appointment-form" onSubmit={form.handleSubmit} noValidate>
                <h3 className="form-title">Book an Appointment</h3>
                <FormError form={form} />
                <Honeypot form={form} />

                <div className="form-row">
                  <div className="form-group">
                    <div className="input-icon"><User size={18} aria-hidden="true" /></div>
                    <label className="visually-hidden" htmlFor={form.field('name').id}>Full name</label>
                    <input type="text" placeholder="Full Name" autoComplete="name" required {...form.field('name')} />
                    <FieldError form={form} name="name" />
                  </div>
                  <div className="form-group">
                    <div className="input-icon"><Mail size={18} aria-hidden="true" /></div>
                    <label className="visually-hidden" htmlFor={form.field('email').id}>Email address</label>
                    <input type="email" placeholder="Email Address" autoComplete="email" required {...form.field('email')} />
                    <FieldError form={form} name="email" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <div className="input-icon"><Phone size={18} aria-hidden="true" /></div>
                    <label className="visually-hidden" htmlFor={form.field('phone').id}>Phone number</label>
                    <input type="tel" placeholder="Phone Number" autoComplete="tel" required {...form.field('phone')} />
                    <FieldError form={form} name="phone" />
                  </div>
                  <div className="form-group">
                    <div className="input-icon"><ChevronDown size={18} aria-hidden="true" /></div>
                    <label className="visually-hidden" htmlFor={form.field('department').id}>Department</label>
                    <select required {...form.field('department')}>
                      <option value="">Select Department</option>
                      {DEPARTMENTS.map((dept) => (
                        <option key={dept.id} value={dept.name}>{dept.name}</option>
                      ))}
                    </select>
                    <FieldError form={form} name="department" />
                  </div>
                </div>
                <div className="form-group full">
                  <div className="input-icon"><Calendar size={18} aria-hidden="true" /></div>
                  <label className="visually-hidden" htmlFor={form.field('date').id}>Preferred date</label>
                  <input type="date" min={today()} required {...form.field('date')} />
                  <FieldError form={form} name="date" />
                </div>
                <div className="form-group full">
                  <div className="input-icon textarea-icon"><MessageSquare size={18} aria-hidden="true" /></div>
                  <label className="visually-hidden" htmlFor={form.field('message').id}>Message (optional)</label>
                  <textarea placeholder="Your Message (Optional)" rows="4" {...form.field('message')} />
                  <FieldError form={form} name="message" />
                </div>
                <button type="submit" className="btn-primary form-submit" disabled={form.status === 'submitting'}>
                  <SubmitLabel form={form} idle="Submit Appointment" icon={Send} />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AppointmentForm

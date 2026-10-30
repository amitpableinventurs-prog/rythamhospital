import React from 'react'
import { Link } from 'react-router-dom'
import Seo from '../../components/Seo/Seo'
import { motion } from 'framer-motion'
import {
  FileCheck2,
  Globe,
  Stethoscope,
  CalendarCheck2,
  Users,
  Copyright,
  ExternalLink,
  ShieldAlert,
  Scale,
  RefreshCw,
  Mail
} from 'lucide-react'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import './LegalPage.css'

const SECTIONS = [
  { id: 'acceptance', icon: FileCheck2, title: '1. Acceptance of Terms' },
  { id: 'website-use', icon: Globe, title: '2. Use of Our Website' },
  { id: 'medical-disclaimer', icon: Stethoscope, title: '3. Medical Disclaimer' },
  { id: 'appointments', icon: CalendarCheck2, title: '4. Appointments & Bookings' },
  { id: 'user-conduct', icon: Users, title: '5. User Conduct' },
  { id: 'intellectual-property', icon: Copyright, title: '6. Intellectual Property' },
  { id: 'third-party-links', icon: ExternalLink, title: '7. Third-Party Links' },
  { id: 'liability', icon: ShieldAlert, title: '8. Limitation of Liability' },
  { id: 'governing-law', icon: Scale, title: '9. Governing Law' },
  { id: 'changes', icon: RefreshCw, title: '10. Changes to These Terms' },
  { id: 'contact', icon: Mail, title: '11. Contact Us' }
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

const Terms = () => {
  return (
    <>
      <Seo path="/terms-and-conditions" />

      <Breadcrumb title="Terms & Conditions" items={[{ label: 'Terms & Conditions' }]} />

      <section className="legal-page section-padding">
        <div className="container">
          <div className="legal-layout">

            {/* ── Sidebar nav ── */}
            <aside className="legal-sidebar">
              <div className="legal-sidebar-card">
                <h4>On this page</h4>
                <ul>
                  {SECTIONS.map((s) => (
                    <li key={s.id}>
                      <a href={`#${s.id}`}>
                        <s.icon size={15} />
                        <span>{s.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* ── Content ── */}
            <div className="legal-content">
              <motion.div
                className="legal-intro"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <span className="legal-updated">Last updated: July 30, 2026</span>
                <p>
                  These Terms & Conditions ("Terms") govern your use of the Rhythm Hospital website
                  and the services we provide. By accessing our website or booking an appointment
                  with us, you agree to be bound by these Terms. Please read them carefully.
                </p>
              </motion.div>

              <motion.div id="acceptance" className="legal-block" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <h2><FileCheck2 size={20} /> 1. Acceptance of Terms</h2>
                <p>
                  By using this website, you confirm that you accept these Terms and agree to
                  comply with them. If you do not agree with any part of these Terms, please do not
                  use our website or services.
                </p>
              </motion.div>

              <motion.div id="website-use" className="legal-block" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <h2><Globe size={20} /> 2. Use of Our Website</h2>
                <p>You agree to use our website only for lawful purposes. You must not:</p>
                <ul className="legal-list">
                  <li>Use the website in any way that could damage, disable, or impair its functioning.</li>
                  <li>Attempt to gain unauthorized access to any part of the website or our systems.</li>
                  <li>Submit false, misleading, or fraudulent information through any form.</li>
                  <li>Use automated tools to scrape or copy content without our permission.</li>
                </ul>
              </motion.div>

              <motion.div id="medical-disclaimer" className="legal-block" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <h2><Stethoscope size={20} /> 3. Medical Disclaimer</h2>
                <p>
                  The content on this website — including blog articles, department information,
                  and doctor profiles — is provided for general informational purposes only and is
                  not a substitute for professional medical advice, diagnosis, or treatment. Always
                  consult a qualified physician regarding any medical condition. In case of a
                  medical emergency, call your local emergency number or visit the nearest emergency
                  room immediately.
                </p>
              </motion.div>

              <motion.div id="appointments" className="legal-block" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <h2><CalendarCheck2 size={20} /> 4. Appointments & Bookings</h2>
                <ul className="legal-list">
                  <li>Appointments booked through our website or phone lines are subject to doctor availability and confirmation by our staff.</li>
                  <li>Please arrive on time for your appointment; late arrivals may need to be rescheduled.</li>
                  <li>Cancellations or rescheduling should be communicated to us as early as possible.</li>
                  <li>Consultation fees, once paid, are governed by our hospital's refund and cancellation policy, available on request.</li>
                </ul>
              </motion.div>

              <motion.div id="user-conduct" className="legal-block" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <h2><Users size={20} /> 5. User Conduct</h2>
                <p>
                  When interacting with our staff, doctors, or through our website (including any
                  forms, reviews, or messages), you agree to behave respectfully and provide
                  accurate information. We reserve the right to refuse service to anyone who
                  engages in abusive, fraudulent, or unlawful conduct.
                </p>
              </motion.div>

              <motion.div id="intellectual-property" className="legal-block" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <h2><Copyright size={20} /> 6. Intellectual Property</h2>
                <p>
                  All content on this website — including text, graphics, logos, images, and
                  design — is the property of Rhythm Hospital or its licensors and is protected by
                  applicable intellectual property laws. You may not reproduce, distribute, or use
                  this content commercially without our prior written consent.
                </p>
              </motion.div>

              <motion.div id="third-party-links" className="legal-block" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <h2><ExternalLink size={20} /> 7. Third-Party Links</h2>
                <p>
                  Our website may contain links to third-party websites for your convenience. We do
                  not control and are not responsible for the content, privacy practices, or
                  availability of these external sites.
                </p>
              </motion.div>

              <motion.div id="liability" className="legal-block" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <h2><ShieldAlert size={20} /> 8. Limitation of Liability</h2>
                <p>
                  To the fullest extent permitted by law, Rhythm Hospital shall not be liable for
                  any indirect, incidental, or consequential damages arising from your use of this
                  website or reliance on any information provided on it. This does not limit our
                  liability for medical negligence in the course of actual treatment, which is
                  governed separately by applicable healthcare laws and our patient care policies.
                </p>
              </motion.div>

              <motion.div id="governing-law" className="legal-block" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <h2><Scale size={20} /> 9. Governing Law</h2>
                <p>
                  These Terms shall be governed by and construed in accordance with the laws
                  applicable in the jurisdiction where Rhythm Hospital operates, without regard to
                  its conflict of law provisions.
                </p>
              </motion.div>

              <motion.div id="changes" className="legal-block" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <h2><RefreshCw size={20} /> 10. Changes to These Terms</h2>
                <p>
                  We may revise these Terms from time to time. Continued use of our website after
                  changes are posted constitutes your acceptance of the updated Terms.
                </p>
              </motion.div>

              <motion.div id="contact" className="legal-block" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <h2><Mail size={20} /> 11. Contact Us</h2>
                <p>
                  If you have any questions about these Terms & Conditions, please{' '}
                  <Link to="/contact">contact us</Link> and our team will be happy to help.
                </p>
              </motion.div>

              <div className="legal-disclaimer">
                This page is a general-purpose template provided for convenience and does not
                constitute legal advice. Please have it reviewed by a qualified lawyer to ensure it
                meets the healthcare and consumer-protection laws applicable to your hospital.
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}

export default Terms

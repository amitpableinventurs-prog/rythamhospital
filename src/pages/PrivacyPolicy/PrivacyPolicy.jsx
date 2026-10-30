import React from 'react'
import { Link } from 'react-router-dom'
import Seo from '../../components/Seo/Seo'
import { motion } from 'framer-motion'
import {
  ShieldCheck,
  Database,
  Cookie,
  Share2,
  Lock,
  UserCheck,
  RefreshCw,
  Mail
} from 'lucide-react'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import './LegalPage.css'

const SECTIONS = [
  { id: 'information-we-collect', icon: Database, title: '1. Information We Collect' },
  { id: 'how-we-use-it', icon: ShieldCheck, title: '2. How We Use Your Information' },
  { id: 'cookies', icon: Cookie, title: '3. Cookies & Tracking' },
  { id: 'sharing', icon: Share2, title: '4. How We Share Information' },
  { id: 'security', icon: Lock, title: '5. Data Security' },
  { id: 'your-rights', icon: UserCheck, title: '6. Your Rights & Choices' },
  { id: 'changes', icon: RefreshCw, title: '7. Changes to This Policy' },
  { id: 'contact', icon: Mail, title: '8. Contact Us' }
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

const PrivacyPolicy = () => {
  return (
    <>
      <Seo path="/privacy-policy" />

      <Breadcrumb title="Privacy Policy" items={[{ label: 'Privacy Policy' }]} />

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
                  Rhythm Hospital ("we", "us", "our") is committed to protecting the privacy of our
                  patients, website visitors, and the people who trust us with their care. This
                  Privacy Policy explains what information we collect, how we use it, and the
                  choices you have. By using our website or our hospital services, you agree to the
                  practices described below.
                </p>
              </motion.div>

              <motion.div id="information-we-collect" className="legal-block" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <h2><Database size={20} /> 1. Information We Collect</h2>
                <p>We may collect the following categories of information:</p>
                <ul className="legal-list">
                  <li><strong>Contact details</strong> — name, phone number, email address, and postal address, such as when you book an appointment or fill out a contact form.</li>
                  <li><strong>Health information</strong> — details you choose to share with our doctors and staff for the purpose of diagnosis, treatment, and care.</li>
                  <li><strong>Appointment & billing data</strong> — visit history, insurance details, and payment information needed to process your treatment and billing.</li>
                  <li><strong>Technical data</strong> — IP address, browser type, device information, and pages visited, collected automatically when you browse our website.</li>
                </ul>
              </motion.div>

              <motion.div id="how-we-use-it" className="legal-block" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <h2><ShieldCheck size={20} /> 2. How We Use Your Information</h2>
                <p>We use the information we collect to:</p>
                <ul className="legal-list">
                  <li>Provide medical consultation, diagnosis, treatment, and follow-up care.</li>
                  <li>Schedule, confirm, and manage appointments.</li>
                  <li>Process billing, insurance claims, and payments.</li>
                  <li>Communicate with you about your care, including reminders and updates.</li>
                  <li>Improve our website, services, and patient experience.</li>
                  <li>Comply with applicable legal and regulatory obligations.</li>
                </ul>
              </motion.div>

              <motion.div id="cookies" className="legal-block" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <h2><Cookie size={20} /> 3. Cookies & Tracking</h2>
                <p>
                  Our website may use cookies and similar technologies to remember your preferences,
                  understand how visitors use our site, and improve overall performance. You can
                  disable cookies through your browser settings; however, some parts of the website
                  may not function as intended if you do so.
                </p>
              </motion.div>

              <motion.div id="sharing" className="legal-block" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <h2><Share2 size={20} /> 4. How We Share Information</h2>
                <p>We do not sell your personal or health information. We may share information only:</p>
                <ul className="legal-list">
                  <li>With doctors, specialists, and staff directly involved in your care.</li>
                  <li>With diagnostic labs, pharmacies, or insurance providers as required to deliver services.</li>
                  <li>When required by law, court order, or government regulation.</li>
                  <li>With trusted service providers who support our website or hospital operations, under confidentiality obligations.</li>
                </ul>
              </motion.div>

              <motion.div id="security" className="legal-block" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <h2><Lock size={20} /> 5. Data Security</h2>
                <p>
                  We use reasonable administrative, technical, and physical safeguards to protect
                  your information from unauthorized access, loss, or misuse. While we work hard to
                  protect your data, no method of transmission or storage is 100% secure, and we
                  cannot guarantee absolute security.
                </p>
              </motion.div>

              <motion.div id="your-rights" className="legal-block" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <h2><UserCheck size={20} /> 6. Your Rights & Choices</h2>
                <p>Depending on applicable law, you may have the right to:</p>
                <ul className="legal-list">
                  <li>Request access to the personal information we hold about you.</li>
                  <li>Ask us to correct inaccurate or incomplete information.</li>
                  <li>Request deletion of your information, subject to legal and medical record-keeping requirements.</li>
                  <li>Opt out of non-essential communications such as promotional messages.</li>
                </ul>
                <p>
                  To exercise any of these rights, please reach out to us using the contact details below.
                </p>
              </motion.div>

              <motion.div id="changes" className="legal-block" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <h2><RefreshCw size={20} /> 7. Changes to This Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time to reflect changes in our
                  practices or for legal, operational, or regulatory reasons. The updated version
                  will be posted on this page with a revised "Last updated" date.
                </p>
              </motion.div>

              <motion.div id="contact" className="legal-block" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <h2><Mail size={20} /> 8. Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy or how your information is
                  handled, please <Link to="/contact">contact us</Link> and our team will be happy
                  to assist you.
                </p>
              </motion.div>

              <div className="legal-disclaimer">
                This page is a general-purpose template provided for convenience and does not
                constitute legal advice. Please have it reviewed by a qualified lawyer to ensure it
                meets the healthcare privacy and data-protection laws applicable to your hospital.
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}

export default PrivacyPolicy

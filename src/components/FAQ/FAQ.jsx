import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Plus, Minus } from 'lucide-react'
import { FAQS } from '../../utils/constants'
import './FAQ.css'

const FAQ = () => {
  const [activeId, setActiveId] = useState(1)

  const toggleFaq = (id) => {
    setActiveId(prev => prev === id ? null : id)
  }

  return (
    <section className="faq-section section-padding">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-subtitle">FAQ</span>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-desc">
            Find answers to commonly asked questions about our hospital and services.
          </p>
        </motion.div>

        <div className="faq-container">
          {FAQS.map((faq, index) => (
            <motion.div
              key={faq.id}
              className={`faq-item ${activeId === faq.id ? 'active' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <button className="faq-question" onClick={() => toggleFaq(faq.id)}>
                <span>{faq.question}</span>
                <div className="faq-toggle">
                  {activeId === faq.id ? <Minus size={18} /> : <Plus size={18} />}
                </div>
              </button>
              <AnimatePresence>
                {activeId === faq.id && (
                  <motion.div
                    className="faq-answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p>{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ
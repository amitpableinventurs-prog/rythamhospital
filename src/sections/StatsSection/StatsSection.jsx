import React from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation, useCounter } from '../../hooks/useScrollAnimation'
import { STATS } from '../../utils/constants'
import { Users, UserCheck, BedDouble, Trophy } from 'lucide-react'
import './StatsSection.css'

const icons = [Users, UserCheck, BedDouble, Trophy]

const StatItem = ({ stat, index, isVisible }) => {
  const count = useCounter(stat.number, 2000, isVisible)
  const Icon = icons[index]

  return (
    <motion.div
      className="stat-item"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="stat-icon">
        <Icon size={30} />
      </div>
      <div className="stat-number">
        {count}{stat.suffix}
      </div>
      <div className="stat-label">{stat.label}</div>
    </motion.div>
  )
}

const StatsSection = () => {
  const [ref, isVisible] = useScrollAnimation(0.3)

  return (
    <section className="stats-section" ref={ref}>
      <div className="stats-overlay"></div>
      <div className="container">
        <div className="stats-grid">
          {STATS.map((stat, index) => (
            <StatItem key={index} stat={stat} index={index} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsSection

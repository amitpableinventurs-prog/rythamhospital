import React from 'react'
import { motion } from 'framer-motion'
import Seo from '../../components/Seo/Seo'
import { doctorsSchema } from '../../lib/seo'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import DoctorCard from '../../components/Cards/DoctorCard'
import { DOCTORS } from '../../utils/constants'
import drVikramMehta from '../../assets/doctors/dr-vikram-mehta.jpg'
import drAnanyaGupta from '../../assets/doctors/dr-ananya-gupta.jpg'
import drSanjayVerma from '../../assets/doctors/dr-sanjay-verma.jpg'
import drKavitaNair from '../../assets/doctors/dr-kavita-nair.jpg'
import './Doctors.css'

const allDoctors = [
  ...DOCTORS,
  {
    id: 5,
    name: 'Dr. Vikram Mehta',
    specialty: 'Dermatologist',
    image: drVikramMehta,
    experience: '8+ Years',
    rating: 4.8,
    social: { facebook: '#', twitter: '#', linkedin: '#', instagram: '#' }
  },
  {
    id: 6,
    name: 'Dr. Ananya Gupta',
    specialty: 'Ophthalmologist',
    image: drAnanyaGupta,
    experience: '14+ Years',
    rating: 4.9,
    social: { facebook: '#', twitter: '#', linkedin: '#', instagram: '#' }
  },
  {
    id: 7,
    name: 'Dr. Sanjay Verma',
    specialty: 'General Surgeon',
    image: drSanjayVerma,
    experience: '20+ Years',
    rating: 4.9,
    social: { facebook: '#', twitter: '#', linkedin: '#', instagram: '#' }
  },
  {
    id: 8,
    name: 'Dr. Kavita Nair',
    specialty: 'Dentist',
    image: drKavitaNair,
    experience: '11+ Years',
    rating: 4.7,
    social: { facebook: '#', twitter: '#', linkedin: '#', instagram: '#' }
  }
]

const DoctorsPage = () => {
  return (
    <>
      <Seo path="/doctors" jsonLd={doctorsSchema(allDoctors)} />
      <Breadcrumb title="Our Doctors" items={[{ label: 'Doctors' }]} />
      <section className="doctors-page section-padding">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="section-subtitle">Medical Team</span>
            <h2 className="section-title">Our Expert Doctors</h2>
            <p className="section-desc">
              Our team of highly qualified doctors is dedicated to providing the best medical care.
            </p>
          </motion.div>
          <div className="doctors-page-grid">
            {allDoctors.map((doctor, index) => (
              <DoctorCard key={doctor.id} doctor={doctor} index={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default DoctorsPage
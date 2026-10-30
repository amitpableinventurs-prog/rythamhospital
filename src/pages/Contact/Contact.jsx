import React from 'react'
import Seo from '../../components/Seo/Seo'
import { hospitalSchema } from '../../lib/seo'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import ContactSection from '../../sections/ContactSection/ContactSection'
import AppointmentForm from '../../components/AppointmentForm/AppointmentForm'

const Contact = () => {
  return (
    <>
      <Seo path="/contact" jsonLd={hospitalSchema()} />
      <Breadcrumb title="Contact Us" items={[{ label: 'Contact' }]} />
      <ContactSection />
      <AppointmentForm />
    </>
  )
}

export default Contact
import React from 'react'
import Seo from '../../components/Seo/Seo'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import SpecialitiesSection from '../../sections/SpecialitiesSection/SpecialitiesSection'
import AppointmentForm from '../../components/AppointmentForm/AppointmentForm'

const Departments = () => {
  return (
    <>
      <Seo path="/departments" />
      <Breadcrumb title="Our Departments" items={[{ label: 'Departments' }]} />
      <SpecialitiesSection />
      <AppointmentForm />
    </>
  )
}

export default Departments
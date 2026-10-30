import React from 'react'
import Seo from '../../components/Seo/Seo'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import AboutSection from '../../sections/AboutSection/AboutSection'
import StatsSection from '../../sections/StatsSection/StatsSection'
import WhyChooseSection from '../../sections/WhyChooseSection/WhyChooseSection'
import TestimonialsSection from '../../sections/TestimonialsSection/TestimonialsSection'
import FAQ from '../../components/FAQ/FAQ'

const About = () => {
  return (
    <>
      <Seo path="/about" />
      <Breadcrumb title="About Us" items={[{ label: 'About Us' }]} />
      <AboutSection />
      <StatsSection />
      <WhyChooseSection />
      <TestimonialsSection />
      <FAQ />
    </>
  )
}

export default About
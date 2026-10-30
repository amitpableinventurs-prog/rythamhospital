import React from 'react'
import Seo from '../../components/Seo/Seo'
import { hospitalSchema, websiteSchema, faqSchema } from '../../lib/seo'
import { FAQS } from '../../utils/constants'
import HeroSection from '../../sections/HeroSection/HeroSection'
import AboutSection from '../../sections/AboutSection/AboutSection'
import ServicesSection from '../../sections/ServicesSection/ServicesSection'
import StatsSection from '../../sections/StatsSection/StatsSection'
import SpecialitiesSection from '../../sections/SpecialitiesSection/SpecialitiesSection'
import DoctorsSection from '../../sections/DoctorsSection/DoctorsSection'
import WhyChooseSection from '../../sections/WhyChooseSection/WhyChooseSection'
import AppointmentForm from '../../components/AppointmentForm/AppointmentForm'
import TestimonialsSection from '../../sections/TestimonialsSection/TestimonialsSection'
import GallerySection from '../../sections/GallerySection/GallerySection'
import FAQ from '../../components/FAQ/FAQ'
import BlogSection from '../../sections/BlogSection/BlogSection'

const Home = () => {
  return (
    <>
      <Seo path="/" jsonLd={[hospitalSchema(), websiteSchema(), faqSchema(FAQS)]} />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <StatsSection />
      <SpecialitiesSection />
      <DoctorsSection />
      <WhyChooseSection />
      <AppointmentForm />
      <TestimonialsSection />
      <GallerySection />
      <FAQ />
      <BlogSection />
    </>
  )
}

export default Home
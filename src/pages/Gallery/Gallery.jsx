import React from 'react'
import Seo from '../../components/Seo/Seo'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import GallerySection from '../../sections/GallerySection/GallerySection'

const GalleryPage = () => {
  return (
    <>
      <Seo path="/gallery" />
      <Breadcrumb title="Our Gallery" items={[{ label: 'Gallery' }]} />
      <GallerySection />
    </>
  )
}

export default GalleryPage
import React, { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { GALLERY_IMAGES } from '../../utils/constants'
import useApi from '../../hooks/useApi'
import { useModalA11y } from '../../hooks/useModalA11y'
import './Gallery.css'

const Gallery = () => {
  const { data, loading } = useApi('/gallery')
  const [activeFilter, setActiveFilter] = useState('All')
  const [openIndex, setOpenIndex] = useState(-1)

  // Uploaded photos first; the brand illustrations fill in until there are at least four.
  const uploaded = data?.items || []
  const images = loading && !data ? [] : uploaded.length >= 4 ? uploaded : [...uploaded, ...GALLERY_IMAGES]
  const categories = ['All', ...new Set(images.map((img) => img.category))]
  const filtered = activeFilter === 'All' ? images : images.filter((img) => img.category === activeFilter)
  const bento = filtered.length >= 5

  // Desktop bento grid (4 columns): the first image is 2x2 and fills the first two
  // rows with four others; images on an incomplete last row widen to close the gap.
  const spanFor = (index) => {
    if (!bento) return ''
    if (index === 0) return 'is-featured'
    const leftover = (filtered.length - 5) % 4
    const firstOfLastRow = filtered.length - leftover
    if (!leftover || index < firstOfLastRow) return ''
    const spans = { 1: [4], 2: [2, 2], 3: [1, 1, 2] }[leftover]
    return `span-${spans[index - firstOfLastRow]}`
  }

  const close = useCallback(() => setOpenIndex(-1), [])
  const step = useCallback(
    (delta) => setOpenIndex((i) => (i + delta + filtered.length) % filtered.length),
    [filtered.length]
  )
  const dialogRef = useModalA11y(openIndex >= 0, close)
  const current = filtered[openIndex]

  useEffect(() => {
    if (openIndex < 0) return undefined
    const onKey = (e) => {
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [openIndex, step])

  return (
    <section className="gallery-section section-padding">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-subtitle">Gallery</span>
          <h2 className="section-title">Our Hospital Gallery</h2>
          <p className="section-desc">
            Take a virtual tour of our state-of-the-art facilities and infrastructure.
          </p>
        </motion.div>

        {categories.length > 2 && (
          <div className="gallery-filters" role="group" aria-label="Filter gallery">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`gallery-filter-btn ${activeFilter === cat ? 'active' : ''}`}
                aria-pressed={activeFilter === cat}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        <motion.ul className={`gallery-grid ${bento ? 'gallery-grid--bento' : ''}`} layout>
          <AnimatePresence>
            {filtered.map((image, index) => (
              <motion.li
                key={image.id}
                className={`gallery-item ${spanFor(index)}`}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.35 }}
              >
                <button
                  type="button"
                  className="gallery-button"
                  onClick={() => setOpenIndex(index)}
                  aria-label={`View larger: ${image.title}`}
                >
                  <figure className="gallery-figure media-frame">
                    <img
                      src={image.image}
                      alt={image.title}
                      width={image.width || 400}
                      height={image.height || 260}
                      loading="lazy"
                      decoding="async"
                      // Portrait images (posters) keep their top - usually the headline - in view.
                      style={image.height > image.width ? { objectPosition: 'top' } : undefined}
                    />
                    <figcaption className="gallery-caption">
                      <span className="gallery-category">{image.category}</span>
                      <span className="gallery-title">{image.title}</span>
                    </figcaption>
                    <span className="gallery-zoom" aria-hidden="true"><ZoomIn size={20} /></span>
                  </figure>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>

      <AnimatePresence>
        {current && (
          <motion.div
            className="gallery-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(e) => e.target === e.currentTarget && close()}
          >
            <div
              className="lightbox-dialog"
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-label={current.title}
              tabIndex={-1}
            >
              <button className="lightbox-close" aria-label="Close" onClick={close}>
                <X size={22} />
              </button>
              {filtered.length > 1 && (
                <>
                  <button className="lightbox-nav prev" aria-label="Previous image" onClick={() => step(-1)}>
                    <ChevronLeft size={26} />
                  </button>
                  <button className="lightbox-nav next" aria-label="Next image" onClick={() => step(1)}>
                    <ChevronRight size={26} />
                  </button>
                </>
              )}
              <motion.img
                key={current.id}
                src={current.image}
                alt={current.title}
                className="lightbox-img"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
              />
              <p className="lightbox-text">
                <span>{current.category}</span>
                {current.title}
                {filtered.length > 1 && <small>{openIndex + 1} / {filtered.length}</small>}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Gallery

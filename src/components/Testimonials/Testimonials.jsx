import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { TESTIMONIALS } from '../../utils/constants'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import './Testimonials.css'

const Testimonials = () => {
  return (
    <section className="testimonials-section section-padding">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-subtitle">Testimonials</span>
          <h2 className="section-title">What Our Patients Say</h2>
          <p className="section-desc">
            Read what our patients have to say about their experience at Rhythm Hospital.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            className="testimonials-swiper"
          >
            {TESTIMONIALS.map(testimonial => (
              <SwiperSlide key={testimonial.id}>
                <div className="testimonial-card">
                  <div className="testimonial-quote">
                    <Quote size={32} />
                  </div>
                  <div className="testimonial-rating">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        fill={i < testimonial.rating ? '#ffc107' : 'none'}
                        color="#ffc107"
                      />
                    ))}
                  </div>
                  <p className="testimonial-text">{testimonial.text}</p>
                  <div className="testimonial-author">
                    <div className="testimonial-avatar">
                      {testimonial.image ? (
                        <img src={testimonial.image} alt={testimonial.name} />
                      ) : (
                        <span>{testimonial.name.charAt(0)}</span>
                      )}
                    </div>
                    <div>
                      <h5 className="testimonial-name">{testimonial.name}</h5>
                      <span className="testimonial-role">{testimonial.role}</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials
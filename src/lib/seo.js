import { SITE, formatAddress } from '../../shared/site.js'

export const SITE_URL = (import.meta.env.VITE_SITE_URL || window.location.origin).replace(/\/$/, '')

export const absoluteUrl = (path = '/') => (/^https?:\/\//.test(path) ? path : `${SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`)

const sameAs = Object.values(SITE.social).filter(Boolean)

export const hospitalSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Hospital',
  '@id': `${SITE_URL}/#hospital`,
  name: SITE.legalName,
  alternateName: SITE.name,
  description: SITE.description,
  url: `${SITE_URL}/`,
  logo: absoluteUrl(SITE.logo),
  image: absoluteUrl(SITE.shareImage),
  telephone: SITE.phones[0],
  email: SITE.emails[0],
  foundingDate: String(SITE.foundingYear),
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.locality,
    addressRegion: SITE.address.region,
    postalCode: SITE.address.postalCode,
    addressCountry: SITE.address.country,
  },
  openingHours: SITE.hours.opening,
  areaServed: [SITE.address.locality, `${SITE.address.district} district`, SITE.address.region],
  hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${SITE.legalName}, ${SITE.address.locality}, ${SITE.address.district}`)}`,
  medicalSpecialty: SITE.medicalSpecialties,
  availableService: { '@type': 'MedicalTherapy', name: '24/7 Emergency Care' },
  ...(sameAs.length ? { sameAs } : {}),
})

export const websiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: SITE.name,
  url: `${SITE_URL}/`,
  publisher: { '@id': `${SITE_URL}/#hospital` },
  inLanguage: 'en-IN',
})

export const breadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [{ label: 'Home', path: '/' }, ...items].map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.label,
    ...(item.path ? { item: absoluteUrl(item.path) } : {}),
  })),
})

export const faqSchema = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
})

export const articleSchema = (post) => ({
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  '@id': `${absoluteUrl(`/blogs/${post.slug}`)}#article`,
  mainEntity: {
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription || post.excerpt,
    image: absoluteUrl(post.coverImage || SITE.shareImage),
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    articleSection: post.category,
    author: {
      '@type': 'Person',
      name: post.author,
      ...(post.authorDetails?.qualification ? { description: post.authorDetails.qualification } : {}),
    },
    publisher: { '@id': `${SITE_URL}/#hospital` },
    mainEntityOfPage: absoluteUrl(`/blogs/${post.slug}`),
  },
  lastReviewed: post.updatedAt || post.publishedAt,
  about: { '@type': 'MedicalCondition', name: post.category },
})

export const doctorsSchema = (doctors) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: `Doctors at ${SITE.name}`,
  itemListElement: doctors.map((doctor, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'Person',
      name: doctor.name,
      jobTitle: doctor.specialty,
      ...(doctor.image ? { image: absoluteUrl(doctor.image) } : {}),
      worksFor: { '@id': `${SITE_URL}/#hospital` },
    },
  })),
})

export { SITE, formatAddress }

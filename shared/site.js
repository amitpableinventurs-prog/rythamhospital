// Single source of truth for hospital details and page SEO text. Imported by
// both the React app (meta tags, structured data) and the Node server
// (crawler meta injection, sitemap), so keep it plain JavaScript.

export const SITE = {
  name: 'Rhythm Hospital',
  legalName: 'Rhythm Multispeciality Hospital',
  tagline: 'Best Multispeciality Healthcare Services',
  description:
    'Rhythm Multispeciality Hospital in Sironj, Vidisha (MP) offers 24/7 emergency care, expert doctors and advanced medical technology. Book your appointment online today.',
  foundingYear: 2009,
  phones: ['+91 7869372026', '+91 9232841718'],
  emails: ['rhythemmultispeciality@gmail.com', 'support@Rhythmhospital.com'],
  whatsapp: '917869372026',
  // Used on the contact page, footer and in Google's structured data (local search).
  address: {
    street: 'Kh. No. 1909, Ward No. 13, Aaron Road',
    locality: 'Sironj',
    district: 'Vidisha',
    region: 'Madhya Pradesh',
    postalCode: '464228',
    country: 'IN',
  },
  hours: {
    weekdays: 'Mon - Sat: 9:00 AM - 8:00 PM',
    sunday: 'Sunday: Emergency Only',
    // schema.org format
    opening: ['Mo-Sa 09:00-20:00'],
  },
  social: {
    facebook: '',
    twitter: '',
    youtube: '',
    instagram: 'https://www.instagram.com/rhythmmmultispeciality/',
    linkedin: '',
  },
  // Map on the contact page, centred on the street address. Once the hospital has a Google
  // Business Profile, use Google Maps > Share > Embed a map and paste its src URL here for an exact pin.
  mapEmbedUrl:
    'https://maps.google.com/maps?q=' +
    encodeURIComponent('Aaron Road, Sironj, Vidisha, Madhya Pradesh 464228') +
    '&t=&z=15&ie=UTF8&iwloc=&output=embed',
  logo: '/img/nav-img.jpeg',
  shareImage: '/og-image.jpg',
  medicalSpecialties: [
    'Cardiovascular',
    'Neurologic',
    'Musculoskeletal',
    'Pediatric',
    'Dermatologic',
    'Optometric',
    'Dentistry',
    'Surgical',
    'Emergency',
  ],
}

export const formatAddress = (a = SITE.address) => `${a.street}, ${a.locality}, ${a.district}, ${a.region} ${a.postalCode}`

// Short form for tight spaces such as the top bar.
export const shortAddress = (a = SITE.address) => `${a.street.split(', ').pop()}, ${a.locality}, ${a.district}`

// Titles are kept under ~60 characters and descriptions under ~160 so search
// results don't truncate them.
export const PAGE_META = {
  '/': {
    title: 'Rhythm Hospital Sironj | Multispeciality Hospital in Vidisha, MP',
    description: SITE.description,
  },
  '/about': {
    title: 'About Us | Rhythm Hospital',
    description:
      'Since 2009 Rhythm Hospital has delivered compassionate, affordable healthcare with 50+ expert doctors, modern infrastructure and 24/7 emergency services.',
  },
  '/doctors': {
    title: 'Doctors & Specialists in Sironj | Rhythm Hospital',
    description:
      'Meet the experienced cardiologists, neurologists, orthopaedic surgeons, paediatricians and other specialists at Rhythm Hospital. Book a consultation online.',
  },
  '/departments': {
    title: 'Departments & Specialities | Rhythm Hospital',
    description:
      'Explore Rhythm Hospital departments: Cardiology, Neurology, Orthopaedics, Paediatrics, Dermatology, Ophthalmology, Dental Care and General Surgery.',
  },
  '/gallery': {
    title: 'Hospital Gallery | Rhythm Hospital',
    description:
      'Take a look inside Rhythm Hospital: our building, patient rooms, medical equipment and the team who care for you.',
  },
  '/blogs': {
    title: 'Health Blog: Tips & Medical Advice | Rhythm Hospital',
    description:
      'Expert health tips, disease prevention guides and wellness advice written by the doctors at Rhythm Hospital.',
  },
  '/contact': {
    title: 'Contact & Book an Appointment | Rhythm Hospital Sironj',
    description:
      'Visit Rhythm Hospital on Aaron Road, Sironj (Vidisha, MP), call us or book an appointment online. Open Mon-Sat 9 AM-8 PM with 24/7 emergency care.',
  },
  '/privacy-policy': {
    title: 'Privacy Policy | Rhythm Hospital',
    description: 'How Rhythm Hospital collects, uses and protects your personal and medical information.',
  },
  '/terms-and-conditions': {
    title: 'Terms & Conditions | Rhythm Hospital',
    description: 'The terms and conditions for using the Rhythm Hospital website and its online services.',
  },
}

export const NOT_FOUND_META = {
  title: 'Page Not Found | Rhythm Hospital',
  description: 'The page you are looking for could not be found.',
}

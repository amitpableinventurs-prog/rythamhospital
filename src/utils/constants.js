import drRajeshKumar from '../assets/doctors/dr-rajesh-kumar.jpg'
import drAmitPatel from '../assets/doctors/dr-amit-patel.jpg'
import drPriyaSharma from '../assets/doctors/dr-priya-sharma.jpg'
import drSnehaReddy from '../assets/doctors/dr-sneha-reddy.jpg'
import galleryHospital from '../assets/illustrations/gallery-hospital.svg'
import galleryRoom from '../assets/illustrations/gallery-room.svg'
import galleryEquipment from '../assets/illustrations/gallery-equipment.svg'
import galleryStaff from '../assets/illustrations/gallery-staff.svg'

export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Departments', path: '/departments' },
  { label: 'Doctors', path: '/doctors' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Blogs', path: '/blogs' },
  { label: 'Contact', path: '/contact' }
]

export const DEPARTMENTS = [
  {
    id: 1,
    name: 'Cardiology',
    title: 'Cardiology',
    titleEmoji: '❤️',
    icon: 'Heart',
    color: '#ff6b6b',
    description: 'Expert care for heart-related conditions with advanced cardiac treatments and diagnostics.',
    tagline: 'Advanced Heart Care with Expert Cardiologists',
    shortDescription: 'Our Cardiology Department provides comprehensive diagnosis, treatment, and preventive care for heart and vascular diseases using advanced technology and experienced cardiac specialists. We are committed to delivering world-class cardiac care with compassion and precision.',
    fullDescription: 'The Cardiology Department specializes in the prevention, diagnosis, and treatment of cardiovascular diseases. Our experienced cardiologists use state-of-the-art diagnostic equipment and minimally invasive procedures to ensure the highest standard of patient care. Whether it\u2019s routine heart screening or emergency cardiac intervention, we provide personalized treatment plans for every patient.',
    services: [
      'Heart Health Consultation', 'ECG (Electrocardiogram)', '2D Echo', 'TMT (Stress Test)',
      'Holter Monitoring', 'Blood Pressure Monitoring', 'Coronary Angiography', 'Angioplasty',
      'Pacemaker Implantation', 'Heart Failure Management', 'Cardiac Rehabilitation', 'Preventive Cardiology'
    ],
    conditions: [
      'Coronary Artery Disease', 'Heart Attack', 'High Blood Pressure', 'Heart Failure',
      'Irregular Heartbeat (Arrhythmia)', 'Chest Pain', 'Valve Disorders',
      'Congenital Heart Disease', 'High Cholesterol', 'Peripheral Artery Disease'
    ],
    whyChooseUs: [
      'Experienced Cardiologists', 'Advanced Cardiac Diagnostics', 'Modern Catheterization Lab',
      'Personalized Treatment Plans', '24×7 Cardiac Emergency Support', 'Evidence-Based Care',
      'Compassionate Patient Support', 'Minimally Invasive Procedures'
    ],
    facilities: [
      { icon: '🏥', label: 'Cardiac ICU' },
      { icon: '❤️', label: 'Cath Lab' },
      { icon: '🩻', label: 'Digital ECG' },
      { icon: '🫀', label: '2D Echo' },
      { icon: '🏃', label: 'Treadmill Test (TMT)' },
      { icon: '📊', label: 'Holter Monitoring' },
      { icon: '🧪', label: 'Advanced Laboratory' },
      { icon: '💊', label: 'In-House Pharmacy' },
      { icon: '🩸', label: 'Blood Bank' },
      { icon: '🚑', label: 'Emergency Ambulance' }
    ],
    process: [
      'Schedule Consultation', 'Cardiac Evaluation', 'Diagnostic Tests',
      'Personalized Treatment Plan', 'Medication / Procedure', 'Follow-up & Lifestyle Guidance'
    ],
    doctor: {
      name: 'Dr. Rajesh Verma',
      role: 'Senior Consultant Cardiologist',
      qualifications: 'MBBS, MD, DM (Cardiology)',
      experience: '18+ Years Experience',
      specialization: 'Interventional Cardiology & Preventive Heart Care',
      image: null
    },
    availability: {
      hours: '9:00 AM – 7:00 PM',
      days: 'Monday - Saturday (OPD Hours)',
      note: 'Emergency Cardiac Care Available 24×7'
    },
    patientInfo: [
      'Previous ECG Reports', 'Echo Reports', 'Blood Test Reports',
      'Current Medications', 'Insurance Card', 'Government ID'
    ],
    insurance: [
      'Cashless Insurance', 'Government Health Schemes', 'Private Insurance',
      'TPA Support', 'Corporate Health Plans'
    ],
    faqs: [
      { q: 'Do I need an appointment?', a: 'Appointments are recommended, but emergency cardiac cases are attended immediately.' },
      { q: 'Do you provide emergency heart treatment?', a: 'Yes, our cardiac emergency team is available 24×7.' },
      { q: 'Can I get all heart tests in one place?', a: 'Yes. ECG, Echo, TMT, Holter Monitoring, Angiography, and other cardiac investigations are available.' },
      { q: 'Do you perform angioplasty?', a: 'Yes, our specialists perform advanced angioplasty and other interventional cardiac procedures.' }
    ],
    ctaLabels: { call: 'Call Cardiology', whatsapp: 'Chat on WhatsApp' }
  },
  {
    id: 2,
    name: 'Neurology',
    title: 'Neurology',
    titleEmoji: '🧠',
    icon: 'Brain',
    color: '#845ef7',
    description: 'Comprehensive neurological care for brain and nervous system disorders.',
    tagline: 'Advanced Neuro Care for Brain, Spine & Nerve Disorders',
    shortDescription: 'Our Neurology Department offers expert diagnosis and treatment of disorders affecting the brain, spinal cord, and nervous system, supported by advanced imaging and a dedicated stroke response team.',
    fullDescription: 'The Neurology Department brings together experienced neurologists and cutting-edge diagnostic technology to manage everything from routine headaches to complex neurological emergencies. Our team focuses on early diagnosis, evidence-based treatment, and long-term rehabilitation support to help patients regain and maintain quality of life.',
    services: [
      'Neurology Consultation', 'EEG (Electroencephalogram)', 'EMG / Nerve Conduction Study',
      'CT & MRI Brain Imaging', 'Stroke Management', 'Epilepsy Treatment', 'Headache & Migraine Clinic',
      'Nerve & Muscle Disorder Treatment', 'Neuro-Rehabilitation', 'Sleep Disorder Evaluation'
    ],
    conditions: [
      'Stroke', 'Epilepsy & Seizures', 'Migraine & Chronic Headache', 'Parkinson\u2019s Disease',
      'Alzheimer\u2019s & Dementia', 'Nerve Pain / Neuropathy', 'Spinal Cord Disorders',
      'Multiple Sclerosis', 'Vertigo & Balance Disorders'
    ],
    whyChooseUs: [
      'Experienced Neurologists', 'Advanced Neuro Imaging (CT/MRI)', '24×7 Stroke Response Team',
      'Comprehensive Epilepsy Care', 'Dedicated Neuro-Rehabilitation Support', 'Evidence-Based Treatment Plans'
    ],
    facilities: [
      { icon: '🧠', label: 'Neuro ICU' },
      { icon: '🩻', label: 'CT / MRI Brain Imaging' },
      { icon: '📊', label: 'EEG Lab' },
      { icon: '⚡', label: 'EMG / Nerve Conduction Study' },
      { icon: '🏥', label: 'Stroke Unit' },
      { icon: '🧪', label: 'Advanced Laboratory' },
      { icon: '💊', label: 'In-House Pharmacy' },
      { icon: '🚑', label: 'Emergency Ambulance' }
    ],
    process: [
      'Schedule Consultation', 'Neurological Examination', 'Diagnostic Tests (EEG/MRI/EMG)',
      'Personalized Treatment Plan', 'Medication / Therapy', 'Follow-up & Rehabilitation'
    ],
    doctor: {
      name: 'Dr. Priya Sharma',
      role: 'Senior Consultant Neurologist',
      qualifications: 'MBBS, MD, DM (Neurology)',
      experience: '12+ Years Experience',
      specialization: 'Stroke Care & Epilepsy Management',
      image: null
    },
    availability: {
      hours: '9:00 AM – 6:00 PM',
      days: 'Monday - Saturday (OPD Hours)',
      note: 'Emergency Stroke Care Available 24×7'
    },
    patientInfo: [
      'Previous MRI / CT Reports', 'EEG / EMG Reports (if any)', 'Current Medications',
      'Insurance Card', 'Government ID'
    ],
    insurance: ['Cashless Insurance', 'Government Health Schemes', 'Private Insurance', 'TPA Support', 'Corporate Health Plans'],
    faqs: [
      { q: 'Do I need a referral to see a neurologist?', a: 'No, you can directly book a consultation with our neurology team.' },
      { q: 'Is emergency stroke care available?', a: 'Yes, our stroke response team is available 24×7.' },
      { q: 'Can I get an MRI done the same day?', a: 'Yes, subject to slot availability.' },
      { q: 'Do you treat epilepsy long-term?', a: 'Yes, we provide ongoing epilepsy management and follow-up care.' }
    ],
    ctaLabels: { call: 'Call Neurology', whatsapp: 'Chat on WhatsApp' }
  },
  {
    id: 3,
    name: 'Orthopedics',
    title: 'Orthopedics',
    titleEmoji: '🦴',
    icon: 'Bone',
    color: '#20c997',
    description: 'Advanced bone and joint care including surgeries and rehabilitation programs.',
    tagline: 'Complete Bone, Joint & Spine Care',
    shortDescription: 'Our Orthopedics Department provides comprehensive care for bones, joints, muscles, and the spine, from fracture treatment to advanced joint replacement surgery and rehabilitation.',
    fullDescription: 'The Orthopedics Department is equipped to handle everything from sports injuries and fractures to complex joint replacement and spine surgery. Our orthopedic surgeons and physiotherapists work together to design personalized recovery plans that restore mobility and get patients back to their daily lives faster.',
    services: [
      'Orthopedic Consultation', 'Fracture Treatment', 'Joint Replacement Surgery (Hip/Knee)',
      'Arthroscopy (Keyhole Surgery)', 'Spine Surgery', 'Sports Injury Treatment',
      'Physiotherapy & Rehabilitation', 'Bone Density Testing', 'Pediatric Orthopedics', 'Pain Management'
    ],
    conditions: [
      'Fractures', 'Arthritis', 'Osteoporosis', 'Ligament & Tendon Injuries',
      'Back & Spine Pain', 'Sports Injuries', 'Joint Pain', 'Slipped Disc', 'Bone Deformities'
    ],
    whyChooseUs: [
      'Experienced Orthopedic Surgeons', 'Advanced Joint Replacement Techniques', 'Dedicated Physiotherapy Unit',
      'Minimally Invasive Arthroscopy', 'Personalized Rehabilitation Plans', '24×7 Fracture & Trauma Support'
    ],
    facilities: [
      { icon: '🦴', label: 'Orthopedic OT' },
      { icon: '🩻', label: 'Digital X-Ray' },
      { icon: '🩻', label: 'MRI Imaging' },
      { icon: '🦿', label: 'Physiotherapy Center' },
      { icon: '🏥', label: 'Joint Replacement Unit' },
      { icon: '🧪', label: 'Bone Density Lab' },
      { icon: '💊', label: 'In-House Pharmacy' },
      { icon: '🚑', label: 'Emergency Ambulance' }
    ],
    process: [
      'Schedule Consultation', 'Physical & Imaging Evaluation', 'Diagnosis',
      'Personalized Treatment Plan', 'Surgery / Non-Surgical Care', 'Physiotherapy & Follow-up'
    ],
    doctor: {
      name: 'Dr. Amit Patel',
      role: 'Senior Consultant Orthopedic Surgeon',
      qualifications: 'MBBS, MS (Orthopedics)',
      experience: '18+ Years Experience',
      specialization: 'Joint Replacement & Sports Injury Surgery',
      image: drAmitPatel
    },
    availability: {
      hours: '9:00 AM – 7:00 PM',
      days: 'Monday - Saturday (OPD Hours)',
      note: 'Emergency Fracture & Trauma Care Available 24×7'
    },
    patientInfo: [
      'Previous X-Ray / MRI Reports', 'Current Medications', 'Insurance Card', 'Government ID'
    ],
    insurance: ['Cashless Insurance', 'Government Health Schemes', 'Private Insurance', 'TPA Support', 'Corporate Health Plans'],
    faqs: [
      { q: 'Do you treat sports injuries?', a: 'Yes, we offer specialized care for sports-related injuries.' },
      { q: 'Is joint replacement surgery available here?', a: 'Yes, including hip and knee replacement.' },
      { q: 'Do you provide physiotherapy after surgery?', a: 'Yes, our physiotherapy team supports full post-surgical recovery.' },
      { q: 'Is emergency fracture care available at night?', a: 'Yes, 24×7.' }
    ],
    ctaLabels: { call: 'Call Orthopedics', whatsapp: 'Chat on WhatsApp' }
  },
  {
    id: 4,
    name: 'Pediatrics',
    title: 'Pediatrics',
    titleEmoji: '🧸',
    icon: 'Baby',
    color: '#339af0',
    description: 'Specialized healthcare for infants, children, and adolescents.',
    tagline: 'Gentle, Expert Care for Your Child at Every Age',
    shortDescription: 'Our Pediatrics Department offers complete healthcare for infants, children, and adolescents, from routine check-ups and vaccinations to specialized treatment for childhood illnesses, in a warm, child-friendly environment.',
    fullDescription: 'The Pediatrics Department is dedicated to the health and wellbeing of children from birth through adolescence. Our pediatricians combine clinical expertise with a gentle, reassuring approach, supported by dedicated neonatal and pediatric intensive care units for the most vulnerable young patients.',
    services: [
      'Newborn & Infant Care', 'Child Health Check-ups', 'Vaccination & Immunization',
      'Growth & Development Monitoring', 'Pediatric Emergency Care', 'Nutrition Counseling',
      'Treatment of Childhood Infections', 'NICU & PICU Care', 'Adolescent Health', 'Allergy Management'
    ],
    conditions: [
      'Fever & Infections', 'Respiratory Illness', 'Asthma', 'Allergies', 'Digestive Issues',
      'Growth Delays', 'Jaundice in Newborns', 'Skin Rashes', 'Nutritional Deficiencies'
    ],
    whyChooseUs: [
      'Experienced Pediatricians', 'Child-Friendly Environment', 'Dedicated NICU & PICU',
      'Complete Vaccination Programs', 'Growth & Nutrition Monitoring', '24×7 Pediatric Emergency Support'
    ],
    facilities: [
      { icon: '👶', label: 'NICU' },
      { icon: '🍼', label: 'PICU' },
      { icon: '💉', label: 'Vaccination Center' },
      { icon: '📊', label: 'Growth Monitoring' },
      { icon: '🏥', label: 'Child-Friendly Wards' },
      { icon: '🧪', label: 'Pediatric Laboratory' },
      { icon: '💊', label: 'Pediatric Pharmacy' },
      { icon: '🚑', label: 'Emergency Ambulance' }
    ],
    process: [
      'Schedule Consultation', 'Child Health Assessment', 'Diagnostic Tests (if required)',
      'Personalized Treatment / Vaccination Plan', 'Medication & Care Guidance', 'Follow-up & Growth Tracking'
    ],
    doctor: {
      name: 'Dr. Sneha Reddy',
      role: 'Senior Consultant Pediatrician',
      qualifications: 'MBBS, MD (Pediatrics)',
      experience: '10+ Years Experience',
      specialization: 'Newborn Care & Childhood Immunization',
      image: null
    },
    availability: {
      hours: '9:00 AM – 7:00 PM',
      days: 'Monday - Saturday (OPD Hours)',
      note: 'Emergency Pediatric Care Available 24×7'
    },
    patientInfo: [
      'Vaccination Record', 'Previous Prescriptions', 'Growth Chart (if available)',
      'Insurance Card', 'Government ID'
    ],
    insurance: ['Cashless Insurance', 'Government Health Schemes', 'Private Insurance', 'TPA Support', 'Corporate Health Plans'],
    faqs: [
      { q: 'Do you provide newborn vaccination schedules?', a: 'Yes, we follow standard immunization schedules and provide reminders.' },
      { q: 'Is a NICU available for premature babies?', a: 'Yes, our NICU is equipped for newborn intensive care.' },
      { q: 'Can I walk in for a fever emergency?', a: 'Yes, pediatric emergency care is available 24×7.' },
      { q: 'Do you offer nutrition counseling for children?', a: 'Yes, our team provides personalized nutrition guidance.' }
    ],
    ctaLabels: { call: 'Call Pediatrics', whatsapp: 'Chat on WhatsApp' }
  },
  {
    id: 5,
    name: 'Dermatology',
    title: 'Dermatology',
    titleEmoji: '✨',
    icon: 'Scan',
    color: '#f06595',
    description: 'Expert skin care treatments and cosmetic dermatology services.',
    tagline: 'Healthy Skin, Hair & Confidence',
    shortDescription: 'Our Dermatology Department offers advanced treatment for skin, hair, and nail conditions along with cosmetic dermatology procedures, combining medical expertise with a focus on lasting, natural results.',
    fullDescription: 'The Dermatology Department treats a wide range of skin, hair, and nail conditions using modern diagnostic tools and evidence-based treatments. From acne and eczema to advanced laser and cosmetic procedures, our dermatologists tailor every treatment plan to the individual patient.',
    services: [
      'Skin Consultation', 'Acne & Scar Treatment', 'Laser Hair Removal', 'Chemical Peels',
      'Anti-Aging Treatments', 'Hair Loss Treatment', 'Skin Allergy Testing',
      'Mole & Skin Tag Removal', 'Psoriasis & Eczema Care', 'Cosmetic Dermatology'
    ],
    conditions: [
      'Acne & Pimples', 'Eczema', 'Psoriasis', 'Skin Allergies', 'Hair Loss / Alopecia',
      'Pigmentation & Dark Spots', 'Fungal Skin Infections', 'Vitiligo', 'Nail Disorders'
    ],
    whyChooseUs: [
      'Experienced Dermatologists', 'Advanced Laser & Cosmetic Technology', 'Personalized Skin & Hair Plans',
      'Safe, Evidence-Based Procedures', 'Privacy-Focused Consultations', 'Follow-up Skin Care Support'
    ],
    facilities: [
      { icon: '🧴', label: 'Skin Clinic' },
      { icon: '💡', label: 'Laser Therapy Unit' },
      { icon: '🔬', label: 'Dermoscopy' },
      { icon: '✨', label: 'Cosmetic Procedure Room' },
      { icon: '🏥', label: 'Minor Procedure OT' },
      { icon: '🧪', label: 'Skin Allergy Laboratory' },
      { icon: '💊', label: 'In-House Pharmacy' },
      { icon: '🚑', label: 'Emergency Ambulance' }
    ],
    process: [
      'Schedule Consultation', 'Skin / Hair Evaluation', 'Diagnostic Tests (if required)',
      'Personalized Treatment Plan', 'Procedure / Medication', 'Follow-up & Skin Care Guidance'
    ],
    doctor: {
      name: 'Dr. Kavita Nair',
      role: 'Senior Consultant Dermatologist',
      qualifications: 'MBBS, MD (Dermatology)',
      experience: '11+ Years Experience',
      specialization: 'Cosmetic Dermatology & Laser Treatments',
      image: null
    },
    availability: {
      hours: '10:00 AM – 6:00 PM',
      days: 'Monday - Saturday (OPD Hours)',
      note: 'Prior Appointment Recommended for Procedures'
    },
    patientInfo: [
      'Previous Prescriptions', 'List of Skin/Hair Products Used', 'Insurance Card', 'Government ID'
    ],
    insurance: ['Cashless Insurance', 'Government Health Schemes', 'Private Insurance', 'TPA Support'],
    faqs: [
      { q: 'Do you treat hair loss?', a: 'Yes, we offer diagnosis and treatment for various types of hair loss.' },
      { q: 'Are cosmetic procedures safe?', a: 'Yes, all procedures are performed by qualified dermatologists using approved techniques.' },
      { q: 'Is a prior appointment required?', a: 'Recommended for procedures; consultations also accept walk-ins subject to availability.' },
      { q: 'Do you treat chronic skin conditions like psoriasis?', a: 'Yes, we provide long-term management plans.' }
    ],
    ctaLabels: { call: 'Call Dermatology', whatsapp: 'Chat on WhatsApp' }
  },
  {
    id: 6,
    name: 'Ophthalmology',
    title: 'Ophthalmology',
    titleEmoji: '👁️',
    icon: 'Eye',
    color: '#51cf66',
    description: 'Complete eye care services including vision correction and surgery.',
    tagline: 'Clear Vision, Expert Eye Care',
    shortDescription: 'Our Ophthalmology Department provides comprehensive eye care, from routine vision testing to advanced cataract and laser surgery, using precision diagnostic equipment and experienced eye specialists.',
    fullDescription: 'The Ophthalmology Department offers complete eye care for all age groups, covering vision correction, medical eye disease management, and surgical procedures such as cataract and LASIK surgery. Our ophthalmologists use advanced imaging to detect and treat eye conditions early, protecting long-term vision health.',
    services: [
      'Eye Consultation', 'Vision Testing', 'Cataract Surgery', 'LASIK / Refractive Surgery',
      'Glaucoma Management', 'Retina Evaluation & Treatment', 'Squint Correction',
      'Diabetic Eye Screening', 'Pediatric Eye Care', 'Contact Lens & Spectacle Prescription'
    ],
    conditions: [
      'Cataract', 'Glaucoma', 'Refractive Errors (Myopia/Hyperopia)', 'Diabetic Retinopathy',
      'Dry Eyes', 'Conjunctivitis', 'Squint', 'Retinal Disorders', 'Age-Related Macular Degeneration'
    ],
    whyChooseUs: [
      'Experienced Ophthalmologists', 'Advanced Cataract & LASIK Technology', 'Precision Diagnostic Imaging',
      'Comprehensive Eye Screening', 'Dedicated Pediatric Eye Care', 'Personalized Vision Correction Plans'
    ],
    facilities: [
      { icon: '👁️', label: 'Eye OT' },
      { icon: '🔬', label: 'Slit Lamp Examination' },
      { icon: '🩻', label: 'OCT Imaging' },
      { icon: '🕶️', label: 'Vision Testing Unit' },
      { icon: '🏥', label: 'Laser Vision Center' },
      { icon: '🧪', label: 'Diagnostic Laboratory' },
      { icon: '💊', label: 'In-House Pharmacy' },
      { icon: '🚑', label: 'Emergency Ambulance' }
    ],
    process: [
      'Schedule Consultation', 'Vision & Eye Examination', 'Diagnostic Tests (OCT/Imaging)',
      'Personalized Treatment Plan', 'Surgery / Vision Correction', 'Follow-up & Recovery Check'
    ],
    doctor: {
      name: 'Dr. Arjun Mehta',
      role: 'Senior Consultant Ophthalmologist',
      qualifications: 'MBBS, MS (Ophthalmology)',
      experience: '14+ Years Experience',
      specialization: 'Cataract & Refractive Surgery',
      image: null
    },
    availability: {
      hours: '9:00 AM – 6:00 PM',
      days: 'Monday - Saturday (OPD Hours)',
      note: 'Emergency Eye Care Available 24×7'
    },
    patientInfo: [
      'Previous Eye Reports / Prescriptions', 'Current Spectacles / Contact Lenses',
      'Insurance Card', 'Government ID'
    ],
    insurance: ['Cashless Insurance', 'Government Health Schemes', 'Private Insurance', 'TPA Support', 'Corporate Health Plans'],
    faqs: [
      { q: 'Is cataract surgery painful?', a: 'No, it is performed under local anesthesia with minimal discomfort.' },
      { q: 'How long does LASIK recovery take?', a: 'Most patients notice improved vision within a day, with full recovery in a few weeks.' },
      { q: 'Do you screen for diabetic eye disease?', a: 'Yes, we offer dedicated diabetic retinopathy screening.' },
      { q: 'Is emergency eye care available?', a: 'Yes, 24×7 for eye injuries and sudden vision issues.' }
    ],
    ctaLabels: { call: 'Call Ophthalmology', whatsapp: 'Chat on WhatsApp' }
  },
  {
    id: 7,
    name: 'Dental Care',
    title: 'Dental Care',
    titleEmoji: '🦷',
    icon: 'Smile',
    color: '#fcc419',
    description: 'Comprehensive dental services from routine checkups to advanced procedures.',
    tagline: 'Complete Dental Care for a Healthy, Confident Smile',
    shortDescription: 'Our Dental Care Department offers a full range of dental services, from routine check-ups and cleaning to root canal treatment, orthodontics, and cosmetic dentistry, in a comfortable, modern setting.',
    fullDescription: 'The Dental Care Department provides preventive, restorative, and cosmetic dental treatments for patients of all ages. Using modern digital imaging and sterilized equipment, our dental team ensures safe, comfortable, and effective care for every visit, from a routine cleaning to a complete smile makeover.',
    services: [
      'Dental Consultation', 'Teeth Cleaning & Scaling', 'Root Canal Treatment', 'Tooth Extraction',
      'Dental Fillings', 'Braces & Orthodontics', 'Dental Implants', 'Crowns & Bridges',
      'Teeth Whitening', 'Pediatric Dentistry'
    ],
    conditions: [
      'Tooth Decay & Cavities', 'Gum Disease', 'Tooth Sensitivity', 'Misaligned Teeth',
      'Broken / Chipped Teeth', 'Bad Breath', 'Tooth Loss', 'Jaw Pain / TMJ Disorders'
    ],
    whyChooseUs: [
      'Experienced Dental Surgeons', 'Modern Digital X-Ray Imaging', 'Painless Treatment Techniques',
      'Strict Sterilization Protocols', 'Cosmetic & Restorative Expertise', 'Comfortable, Child-Friendly Setting'
    ],
    facilities: [
      { icon: '🦷', label: 'Dental OT' },
      { icon: '🩻', label: 'Digital X-Ray' },
      { icon: '🪥', label: 'Oral Hygiene Unit' },
      { icon: '✨', label: 'Cosmetic Dentistry Suite' },
      { icon: '🏥', label: 'Sterilization Unit' },
      { icon: '🧪', label: 'Dental Laboratory' },
      { icon: '💊', label: 'In-House Pharmacy' },
      { icon: '🚑', label: 'Emergency Ambulance' }
    ],
    process: [
      'Schedule Consultation', 'Dental Examination', 'Digital X-Ray (if required)',
      'Personalized Treatment Plan', 'Procedure / Treatment', 'Follow-up & Oral Care Guidance'
    ],
    doctor: {
      name: 'Dr. Neha Kapoor',
      role: 'Senior Consultant Dental Surgeon',
      qualifications: 'BDS, MDS (Orthodontics)',
      experience: '9+ Years Experience',
      specialization: 'Orthodontics & Cosmetic Dentistry',
      image: null
    },
    availability: {
      hours: '9:00 AM – 7:00 PM',
      days: 'Monday - Saturday (OPD Hours)',
      note: 'Emergency Dental Care Available 24×7'
    },
    patientInfo: [
      'Previous Dental X-Rays (if any)', 'Current Medications', 'Insurance Card', 'Government ID'
    ],
    insurance: ['Cashless Insurance', 'Government Health Schemes', 'Private Insurance', 'TPA Support'],
    faqs: [
      { q: 'Is root canal treatment painful?', a: 'No, it is performed under local anesthesia and is generally painless.' },
      { q: 'Do you treat children?', a: 'Yes, we offer dedicated pediatric dental care.' },
      { q: 'How long do dental implants take?', a: 'The full process typically spans a few months, including healing time.' },
      { q: 'Is emergency dental care available?', a: 'Yes, 24×7 for dental emergencies.' }
    ],
    ctaLabels: { call: 'Call Dental Care', whatsapp: 'Chat on WhatsApp' }
  },
  {
    id: 8,
    name: 'General Surgery',
    title: 'General Surgery',
    titleEmoji: '🏥',
    icon: 'Syringe',
    color: '#ff922b',
    description: 'Wide range of surgical procedures performed by experienced surgeons.',
    tagline: 'Skilled, Safe Surgical Care for Every Need',
    shortDescription: 'Our General Surgery Department performs a wide range of surgical procedures, from routine to complex, using modern minimally invasive techniques and a strong focus on patient safety and faster recovery.',
    fullDescription: 'The General Surgery Department handles a broad spectrum of surgical conditions, including abdominal, gastrointestinal, and soft tissue procedures. Our surgical team combines experience with minimally invasive laparoscopic techniques wherever possible, helping patients recover faster with less discomfort.',
    services: [
      'Surgical Consultation', 'Laparoscopic (Keyhole) Surgery', 'Hernia Repair', 'Gallbladder Surgery',
      'Appendix Surgery', 'Thyroid Surgery', 'Hemorrhoid Treatment', 'Wound & Injury Care',
      'Tumor & Cyst Removal', 'Post-Surgical Care'
    ],
    conditions: [
      'Appendicitis', 'Gallstones', 'Hernia', 'Thyroid Swelling', 'Hemorrhoids (Piles)',
      'Abdominal Pain', 'Cysts & Lipomas', 'Intestinal Obstruction', 'Soft Tissue Infections'
    ],
    whyChooseUs: [
      'Experienced General Surgeons', 'Minimally Invasive Laparoscopic Techniques', 'Modern Operation Theatres',
      'Strict Sterilization Protocols', 'Dedicated Surgical ICU', '24×7 Emergency Surgery Support'
    ],
    facilities: [
      { icon: '🏥', label: 'Operation Theatre' },
      { icon: '🛏️', label: 'Surgical ICU' },
      { icon: '🩻', label: 'CT Scan' },
      { icon: '🧪', label: 'Advanced Laboratory' },
      { icon: '💊', label: 'In-House Pharmacy' },
      { icon: '🩸', label: 'Blood Bank' },
      { icon: '😷', label: 'Sterilization Unit' },
      { icon: '🚑', label: 'Emergency Ambulance' }
    ],
    process: [
      'Schedule Consultation', 'Surgical Evaluation', 'Pre-Op Diagnostic Tests',
      'Personalized Surgical Plan', 'Surgery', 'Post-Op Recovery & Follow-up'
    ],
    doctor: {
      name: 'Dr. Vikram Singh',
      role: 'Senior Consultant General Surgeon',
      qualifications: 'MBBS, MS (General Surgery)',
      experience: '16+ Years Experience',
      specialization: 'Laparoscopic & Minimally Invasive Surgery',
      image: null
    },
    availability: {
      hours: 'By Appointment',
      days: '6 Days a Week (OPD Hours)',
      note: 'Emergency Surgery Available 24×7'
    },
    patientInfo: [
      'Previous Reports & Imaging', 'Current Medications', 'Insurance Card',
      'Government ID', 'Fasting Instructions (if advised)'
    ],
    insurance: ['Cashless Insurance', 'Government Health Schemes', 'Private Insurance', 'TPA Support', 'Corporate Health Plans'],
    faqs: [
      { q: 'Is laparoscopic surgery available for all procedures?', a: 'Where medically suitable, we prefer minimally invasive techniques for faster recovery.' },
      { q: 'How long is the hospital stay after surgery?', a: 'This varies by procedure; our team will explain the expected recovery timeline during consultation.' },
      { q: 'Is emergency surgery available at night?', a: 'Yes, 24×7.' },
      { q: 'Can I use insurance for surgery?', a: 'Yes, we support cashless and reimbursement claims.' }
    ],
    ctaLabels: { call: 'Call Surgery Dept', whatsapp: 'Chat on WhatsApp' }
  }
]

export const DOCTORS = [
  {
    id: 1,
    name: 'Dr. Rajesh Kumar',
    specialty: 'Cardiologist',
    image: drRajeshKumar,
    experience: '15+ Years',
    rating: 4.9,
    social: { facebook: '#', twitter: '#', linkedin: '#', instagram: '#' }
  },
  {
    id: 2,
    name: 'Dr. Priya Sharma',
    specialty: 'Neurologist',
    image: drPriyaSharma,
    experience: '12+ Years',
    rating: 4.8,
    social: { facebook: '#', twitter: '#', linkedin: '#', instagram: '#' }
  },
  {
    id: 3,
    name: 'Dr. Amit Patel',
    specialty: 'Orthopedic Surgeon',
    image: drAmitPatel,
    experience: '18+ Years',
    rating: 4.9,
    social: { facebook: '#', twitter: '#', linkedin: '#', instagram: '#' }
  },
  {
    id: 4,
    name: 'Dr. Sneha Reddy',
    specialty: 'Pediatrician',
    image: drSnehaReddy,
    experience: '10+ Years',
    rating: 4.7,
    social: { facebook: '#', twitter: '#', linkedin: '#', instagram: '#' }
  }
]

export const SERVICES = [
  {
    id: 1,
    title: 'Emergency Care',
    tagline: '24/7 Emergency Department',
    description: '24/7 emergency medical services with rapid response teams.',
    icon: 'Ambulance',
    image: null,
    shortDescription: '24/7 emergency medical services with rapid response teams.',
    fullDescription: 'Our Emergency Care unit is staffed around the clock by experienced trauma physicians, nurses, and paramedics ready to respond within minutes. Equipped with advanced diagnostic tools, a dedicated resuscitation bay, and rapid-response ambulances, we handle everything from accidents and cardiac events to critical medical emergencies. Every patient is triaged immediately on arrival to ensure the most urgent cases are treated first.',
    services: ['Emergency Physician', 'Trauma Care', 'ICU Support', 'Cardiac Emergency', 'Stroke Management', 'Emergency Surgery', 'Ambulance Service', 'Ventilator Support'],
    conditions: ['Heart Attack', 'Stroke', 'High Fever', 'Fractures', 'Burns', 'Poisoning', 'Chest Pain', 'Breathing Problems'],
    whyChooseUs: ['Experienced Specialists', '24×7 Availability', 'Advanced Medical Equipment', 'Fast Admission', 'Dedicated Emergency Team', 'Modern ICU'],
    facilities: [
      { icon: '🏥', label: 'ICU' },
      { icon: '🩻', label: 'MRI' },
      { icon: '🩻', label: 'CT Scan' },
      { icon: '🧪', label: 'Laboratory' },
      { icon: '💊', label: 'Pharmacy' },
      { icon: '🩸', label: 'Blood Bank' },
      { icon: '🚑', label: 'Ambulance' },
      { icon: '🏥', label: 'Operation Theatre' }
    ],
    process: ['Call Hospital', 'Ambulance Arrives', 'Emergency Assessment', 'Immediate Treatment', 'Admission if Required'],
    doctor: { name: 'Dr. Rahul Sharma', role: 'Senior Emergency Specialist', experience: '15+ Years Experience', image: null },
    availability: { hours: 'Open 24 Hours', days: '365 Days', note: 'Emergency Response' },
    patientInfo: ['Previous Reports', 'Current Medicines', 'Insurance Card', 'ID Proof'],
    insurance: ['Cashless Insurance', 'Government Schemes', 'Private Insurance', 'TPA Support'],
    faqs: [
      { q: 'Is appointment required?', a: 'No.' },
      { q: 'Is ambulance available?', a: 'Yes.' },
      { q: 'Is emergency open 24/7?', a: 'Yes.' }
    ]
  },
  {
    id: 2,
    title: 'Operation Theater',
    tagline: 'Advanced Surgical Care',
    description: 'State-of-the-art operation theaters with advanced surgical equipment.',
    icon: 'Stethoscope',
    image: null,
    shortDescription: 'State-of-the-art operation theaters with advanced surgical equipment.',
    fullDescription: 'Our operation theaters are equipped with the latest surgical technology, laminar airflow systems, and real-time monitoring to ensure the highest standards of safety and precision. A skilled team of surgeons, anesthetists, and support staff work together across general, minimally invasive, and specialized procedures, backed by strict sterilization protocols to support faster recovery.',
    services: ['General Surgery', 'Minimally Invasive Surgery', 'Anesthesia Care', 'Pre-Op Assessment', 'Post-Op Monitoring', 'Sterile OT Environment', 'Surgical ICU', 'Pain Management'],
    conditions: ['Appendicitis', 'Gallstones', 'Hernia', 'Tumors', 'Fractures Requiring Surgery', 'Internal Injuries', 'Cysts', 'Obstructions'],
    whyChooseUs: ['Experienced Surgeons', 'Modern OT Equipment', 'Strict Sterilization', 'Skilled Anesthesia Team', 'Faster Recovery Protocols', 'Post-Op Support'],
    facilities: [
      { icon: '🏥', label: 'Operation Theatre' },
      { icon: '🛏️', label: 'ICU' },
      { icon: '🩻', label: 'CT Scan' },
      { icon: '🧪', label: 'Laboratory' },
      { icon: '💊', label: 'Pharmacy' },
      { icon: '🩸', label: 'Blood Bank' },
      { icon: '😷', label: 'Sterilization Unit' },
      { icon: '🫁', label: 'Ventilator Support' }
    ],
    process: ['Consultation & Diagnosis', 'Pre-Op Assessment', 'Surgery Scheduling', 'Operation', 'Recovery & Discharge'],
    doctor: { name: 'Dr. Amit Patel', role: 'Senior Surgeon', experience: '18+ Years Experience', image: drAmitPatel },
    availability: { hours: 'By Appointment', days: '6 Days a Week', note: 'Emergency Surgery Available 24×7' },
    patientInfo: ['Previous Reports', 'Current Medicines', 'Insurance Card', 'ID Proof', 'Fasting Instructions (if advised)'],
    insurance: ['Cashless Insurance', 'Government Schemes', 'Private Insurance', 'TPA Support'],
    faqs: [
      { q: 'Do I need a referral for surgery?', a: 'A consultation with our specialist is required first.' },
      { q: 'Is emergency surgery available?', a: 'Yes, 24/7.' },
      { q: 'Can I use insurance for surgery?', a: 'Yes, we support cashless and reimbursement claims.' }
    ]
  },
  {
    id: 3,
    title: 'Outdoor Checkup',
    tagline: 'Preventive & OPD Care',
    description: 'Regular health checkups and preventive care programs.',
    icon: 'ClipboardPlus',
    image: null,
    shortDescription: 'Regular health checkups and preventive care programs.',
    fullDescription: 'Our outpatient checkup programs focus on early detection and prevention. From routine screenings and diagnostic tests to consultations with specialists, our OPD services are designed to fit conveniently into your schedule while keeping a close eye on your long-term health.',
    services: ['General Consultation', 'Full Body Checkup', 'Diagnostic Tests', 'Specialist Referrals', 'Vaccination', 'Health Screening Packages', 'Follow-up Visits', 'Health Counseling'],
    conditions: ['Diabetes', 'Hypertension', 'Thyroid Disorders', 'Cholesterol Issues', 'Seasonal Illness', 'Allergies', 'General Weakness', 'Routine Wellness'],
    whyChooseUs: ['Quick OPD Turnaround', 'Experienced General Physicians', 'Digital Reports', 'Affordable Packages', 'Easy Online Booking', 'Family Health Plans'],
    facilities: [
      { icon: '🧪', label: 'Laboratory' },
      { icon: '🩻', label: 'X-Ray' },
      { icon: '💊', label: 'Pharmacy' },
      { icon: '🩺', label: 'Consultation Rooms' },
      { icon: '💉', label: 'Vaccination Center' },
      { icon: '🖥️', label: 'Digital Reports' }
    ],
    process: ['Book Appointment', 'Registration', 'Consultation', 'Diagnostic Tests (if needed)', 'Report & Follow-up'],
    doctor: { name: 'Dr. Sneha Reddy', role: 'General Physician', experience: '10+ Years Experience', image: drSnehaReddy },
    availability: { hours: '8 AM – 8 PM', days: 'Monday to Saturday', note: 'Walk-ins Welcome' },
    patientInfo: ['Previous Reports', 'Current Medicines', 'Insurance Card', 'ID Proof'],
    insurance: ['Cashless Insurance', 'Government Schemes', 'Private Insurance', 'TPA Support'],
    faqs: [
      { q: 'Is appointment required?', a: 'Preferred, but walk-ins are accepted.' },
      { q: 'Are reports available same day?', a: 'Yes, for most routine tests.' },
      { q: 'Can I get a full body checkup?', a: 'Yes, we offer multiple checkup packages.' }
    ]
  },
  {
    id: 4,
    title: 'Ambulance Service',
    tagline: 'Rapid Response, Anytime',
    description: 'Quick and reliable ambulance service available round the clock.',
    icon: 'Truck',
    image: null,
    shortDescription: 'Quick and reliable ambulance service available round the clock.',
    fullDescription: 'Our fleet of fully equipped ambulances is available 24/7, staffed with trained paramedics and stocked with essential life-support equipment. Whether it is a medical emergency or a scheduled transfer, our dispatch team ensures a rapid, safe response with real-time coordination with our emergency department.',
    services: ['Emergency Ambulance', 'Inter-Hospital Transfer', 'Trained Paramedics', 'Life-Support Equipment', 'Oxygen Support', 'GPS Tracked Dispatch', 'Stretcher Assistance', 'Cardiac Ambulance'],
    conditions: ['Accidents', 'Cardiac Emergencies', 'Breathing Difficulty', 'Severe Injuries', 'High-Risk Pregnancy Transfer', 'Post-Surgery Transfer', 'Unconsciousness', 'Poisoning'],
    whyChooseUs: ['Rapid Dispatch', 'Trained Paramedic Staff', 'Fully Equipped Vehicles', 'GPS Tracking', '24×7 Availability', 'Seamless ER Handover'],
    facilities: [
      { icon: '🚑', label: 'Ambulance Fleet' },
      { icon: '🫁', label: 'Oxygen Support' },
      { icon: '🩹', label: 'First Aid Equipment' },
      { icon: '📍', label: 'GPS Dispatch' },
      { icon: '🛏️', label: 'Stretcher Support' },
      { icon: '📞', label: '24×7 Helpline' }
    ],
    process: ['Call Hospital', 'Ambulance Dispatched', 'Onboard First Aid', 'Transit Monitoring', 'ER Handover'],
    doctor: { name: 'Dr. Rahul Sharma', role: 'Senior Emergency Specialist', experience: '15+ Years Experience', image: null },
    availability: { hours: 'Open 24 Hours', days: '365 Days', note: 'Rapid Response' },
    patientInfo: ['Pickup Address', 'Contact Number', 'Insurance Card (if available)', 'ID Proof'],
    insurance: ['Cashless Insurance', 'Government Schemes', 'Private Insurance', 'TPA Support'],
    faqs: [
      { q: 'How fast does the ambulance arrive?', a: 'Our teams aim for the fastest possible response based on location.' },
      { q: 'Is the ambulance equipped for cardiac cases?', a: 'Yes, with life-support equipment onboard.' },
      { q: 'Can I book an ambulance for transfer?', a: 'Yes, inter-hospital transfers are supported.' }
    ]
  },
  {
    id: 5,
    title: 'Medicine Support',
    tagline: 'In-House Pharmacy',
    description: 'In-house pharmacy with all essential medicines available.',
    icon: 'Pill',
    image: null,
    shortDescription: 'In-house pharmacy with all essential medicines available.',
    fullDescription: 'Our in-house pharmacy stocks a comprehensive range of medications, from everyday prescriptions to specialized treatments, so patients can get everything they need without leaving the hospital. Our licensed pharmacists are available to answer questions and ensure safe, timely access to medicines around the clock.',
    services: ['Prescription Medicines', 'OTC Medicines', 'Specialty Drugs', 'Home Delivery', 'Medicine Counseling', 'Insurance Billing Support', 'Stock Availability Check', '24×7 Pharmacy Access'],
    conditions: ['Chronic Illness Management', 'Post-Surgery Medication', 'Diabetes Care', 'Cardiac Medication', 'Antibiotics Course', 'Pain Management', 'Allergy Medication', 'General Prescriptions'],
    whyChooseUs: ['Licensed Pharmacists', 'Wide Medicine Range', 'Genuine Medicines', 'Quick Dispensing', '24×7 Availability', 'Insurance Support'],
    facilities: [
      { icon: '💊', label: 'Pharmacy Counter' },
      { icon: '🏥', label: 'In-Hospital Access' },
      { icon: '🧊', label: 'Cold Storage Medicines' },
      { icon: '🧾', label: 'Insurance Billing' },
      { icon: '🚚', label: 'Home Delivery' },
      { icon: '📞', label: '24×7 Helpline' }
    ],
    process: ['Prescription Submitted', 'Pharmacist Review', 'Medicine Dispensed', 'Billing & Insurance', 'Counseling on Use'],
    doctor: { name: 'Dr. Priya Sharma', role: 'Chief Pharmacist', experience: '12+ Years Experience', image: drPriyaSharma },
    availability: { hours: 'Open 24 Hours', days: '365 Days', note: 'Always Stocked' },
    patientInfo: ['Valid Prescription', 'Insurance Card (if applicable)', 'ID Proof'],
    insurance: ['Cashless Insurance', 'Government Schemes', 'Private Insurance', 'TPA Support'],
    faqs: [
      { q: 'Is the pharmacy open 24/7?', a: 'Yes.' },
      { q: 'Can I get home delivery?', a: 'Yes, for select medicines and locations.' },
      { q: 'Do you accept insurance billing?', a: 'Yes, for eligible plans.' }
    ]
  },
  {
    id: 6,
    title: 'Blood Bank',
    tagline: 'Safe & Reliable Blood Supply',
    description: 'Well-equipped blood bank for emergency blood requirements.',
    icon: 'Droplets',
    image: null,
    shortDescription: 'Well-equipped blood bank for emergency blood requirements.',
    fullDescription: 'Our blood bank maintains a well-stocked, rigorously tested supply across all blood groups to meet emergency and scheduled transfusion needs. Following strict screening and storage protocols, we work closely with donors and partner blood banks to ensure a reliable, safe supply is always available.',
    services: ['Blood Testing', 'Blood Storage', 'Component Separation', 'Emergency Blood Supply', 'Blood Donation Camps', 'Cross-Matching', 'Plasma Services', 'Platelet Support'],
    conditions: ['Severe Blood Loss', 'Anemia', 'Surgery Requirements', 'Dengue (Platelet Support)', 'Thalassemia', 'Accident Trauma', 'Childbirth Complications', 'Cancer Treatment Support'],
    whyChooseUs: ['Rigorously Screened Blood', 'All Blood Groups Available', 'Rapid Emergency Supply', 'Trained Blood Bank Staff', 'Strict Storage Protocols', 'Partner Blood Bank Network'],
    facilities: [
      { icon: '🩸', label: 'Blood Bank' },
      { icon: '🧪', label: 'Testing Laboratory' },
      { icon: '🧊', label: 'Cold Storage' },
      { icon: '🏥', label: 'Emergency Access' },
      { icon: '🚑', label: 'Ambulance Coordination' },
      { icon: '📞', label: '24×7 Helpline' }
    ],
    process: ['Request Raised', 'Blood Group Matching', 'Cross-Matching Test', 'Blood Issued', 'Transfusion Support'],
    doctor: { name: 'Dr. Rajesh Kumar', role: 'Blood Bank In-Charge', experience: '15+ Years Experience', image: drRajeshKumar },
    availability: { hours: 'Open 24 Hours', days: '365 Days', note: 'Emergency Supply' },
    patientInfo: ['Doctor Prescription', 'Blood Group Report (if available)', 'ID Proof'],
    insurance: ['Cashless Insurance', 'Government Schemes', 'Private Insurance', 'TPA Support'],
    faqs: [
      { q: 'Is blood available for all groups?', a: 'Yes, subject to current stock.' },
      { q: 'Can I donate blood here?', a: 'Yes, we regularly hold donation camps.' },
      { q: 'Is emergency blood supply available at night?', a: 'Yes, 24/7.' }
    ]
  }
]

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Ankit Verma',
    role: 'Patient',
    rating: 5,
    text: 'The care I received at Rhythm Hospital was exceptional. The doctors were knowledgeable and the staff was incredibly supportive throughout my treatment.',
    image: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Ankit-Verma&backgroundColor=b6e3f4&mouth=smile&eyes=happy&eyebrows=default'
  },
  {
    id: 2,
    name: 'Sunita Devi',
    role: 'Patient',
    rating: 5,
    text: 'I am grateful to the entire team at Rhythm Hospital. They saved my life with their quick response and expert medical care. Highly recommended!',
    image: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Sunita-Devi&backgroundColor=ffd6a5&mouth=smile&eyes=happy&eyebrows=default'
  },
  {
    id: 3,
    name: 'Rahul Singh',
    role: 'Patient',
    rating: 5,
    text: 'Outstanding hospital with world-class facilities. The doctors explained everything clearly and made me feel comfortable throughout the process.',
    image: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Rahul-Singh&backgroundColor=c1f0c8&mouth=smile&eyes=happy&eyebrows=default'
  },
  {
    id: 4,
    name: 'Meera Joshi',
    role: 'Patient',
    rating: 4,
    text: 'Very professional and caring staff. The hospital is clean and well-maintained. I would definitely recommend Rhythm to anyone seeking quality healthcare.',
    image: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Meera-Joshi&backgroundColor=ffcfd2&mouth=smile&eyes=happy&eyebrows=default'
  }
]

export const STATS = [
  { number: 5000, suffix: '+', label: 'Happy Patients' },
  { number: 50, suffix: '+', label: 'Expert Doctors' },
  { number: 30, suffix: '+', label: 'Hospital Rooms' },
  { number: 15, suffix: '+', label: 'Years Experience' }
]

export const FAQS = [
  {
    id: 1,
    question: 'What are the visiting hours?',
    answer: 'Our visiting hours are from 10:00 AM to 8:00 PM daily. ICU visiting hours are limited to specific time slots for patient safety.'
  },
  {
    id: 2,
    question: 'Do you accept insurance?',
    answer: 'Yes, we accept most major insurance plans. Please contact our billing department for specific insurance queries and cashless treatment facilities.'
  },
  {
    id: 3,
    question: 'How can I book an appointment?',
    answer: 'You can book an appointment online through our website, call us at our helpline, or visit the hospital reception directly.'
  },
  {
    id: 4,
    question: 'Is emergency service available 24/7?',
    answer: 'Yes, our emergency department is open 24 hours a day, 7 days a week with trained emergency physicians and staff always on duty.'
  },
  {
    id: 5,
    question: 'What specialties are available?',
    answer: 'We offer a wide range of specialties including Cardiology, Neurology, Orthopedics, Pediatrics, Dermatology, Ophthalmology, and many more.'
  }
]

// Shown until real photos are uploaded from the admin panel (Admin > Gallery).
export const GALLERY_IMAGES = [
  { id: 'hospital', category: 'Hospital', title: 'Rhythm Hospital building', image: galleryHospital },
  { id: 'rooms', category: 'Rooms', title: 'Comfortable patient rooms', image: galleryRoom },
  { id: 'equipment', category: 'Equipment', title: 'Advanced medical equipment', image: galleryEquipment },
  { id: 'staff', category: 'Staff', title: 'Our caring medical team', image: galleryStaff }
]
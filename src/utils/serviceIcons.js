import {
  Ambulance, Stethoscope, ClipboardPlus, Truck, Pill, Droplets,
  Heart, Brain, Bone, Baby, Scan, Eye, Smile, Syringe
} from 'lucide-react'

export const serviceIconMap = {
  Ambulance,
  Stethoscope,
  ClipboardPlus,
  Truck,
  Pill,
  Droplets,
  Heart,
  Brain,
  Bone,
  Baby,
  Scan,
  Eye,
  Smile,
  Syringe
}

export const getServiceIcon = (iconName) => serviceIconMap[iconName] || Stethoscope

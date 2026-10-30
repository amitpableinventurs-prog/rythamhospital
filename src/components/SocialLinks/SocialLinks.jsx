import React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa'
import { SITE } from '../../../shared/site.js'

const NETWORKS = [
  { key: 'facebook', label: 'Facebook', icon: FaFacebookF },
  { key: 'instagram', label: 'Instagram', icon: FaInstagram },
  { key: 'twitter', label: 'X (Twitter)', icon: FaTwitter },
  { key: 'linkedin', label: 'LinkedIn', icon: FaLinkedinIn },
  { key: 'youtube', label: 'YouTube', icon: FaYoutube },
]

/** Icons for the social profiles set in shared/site.js; networks without a URL are hidden. */
const SocialLinks = ({ className, size = 16 }) => (
  <div className={className}>
    {NETWORKS.filter(({ key }) => SITE.social[key]).map(({ key, label, icon: Icon }) => (
      <a key={key} href={SITE.social[key]} target="_blank" rel="noopener noreferrer" aria-label={`${SITE.name} on ${label}`}>
        <Icon size={size} />
      </a>
    ))}
  </div>
)

export default SocialLinks

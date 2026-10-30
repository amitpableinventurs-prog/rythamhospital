import React from 'react'
import { Phone, Mail, Clock, MapPin } from 'lucide-react'
import SocialLinks from '../SocialLinks/SocialLinks'
import { shortAddress } from '../../../shared/site.js'
import './TopBar.css'

const TopBar = () => {
  return (
    <div className="topbar">
      <div className="container">
        <div className="topbar-inner">
          <div className="topbar-left">
            <div className="topbar-item">
              <Phone size={14} />
              <span>+91 7869372026</span>
            </div>

            <div className="topbar-item">
              <Mail size={14} />
              <span>rhythemmultispeciality@gmail.com</span>
            </div>

            <div className="topbar-item topbar-item-hide">
              <Clock size={14} />
              <span>Mon - Sat: 9:00 AM - 8:00 PM</span>
            </div>
          </div>

          <div className="topbar-right">
            <div className="topbar-item topbar-item-location">
              <MapPin size={14} />
              <span>{shortAddress()}</span>
            </div>

            <SocialLinks className="topbar-social" size={14} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopBar
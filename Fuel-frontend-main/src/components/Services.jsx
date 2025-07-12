import React, { useState } from 'react'
import aboutImage1 from '../assets/about-image1.jpeg'
import { Link } from 'react-router-dom'
import '../App.css'

import LanguageIcon from '@mui/icons-material/Language';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PhoneCallbackIcon from '@mui/icons-material/PhoneCallback';


import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';


import homeImage2 from '../assets/Agro-industry.jpg'
import homeImage3 from '../assets/Commer.jpg'
import homeImage4 from '../assets/Indus.jpg'
import homeImage5 from '../assets/telec.jpg'

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import img from '../assets/fuelcane.png'

const Services = () => {
  const [fuelNeeds, setFuelNeeds] = useState([
    {
      image: homeImage2,
      title: 'Agro-industry',
      items: ['Tractors', 'Pump Sets', 'Rice Mills'],
    },
    {
      image: homeImage3,
      title: 'Commercial',
      items: ['Hospitals and Hotels', 'Fisheries and Dairy', 'Malls and Apartments'],
    },
    {
      image: homeImage4,
      title: 'Industrial',
      items: ['Construction', 'Manufacturing', 'Mining'],
    },
    {
      image: homeImage5,
      title: 'Telecom',
      items: ['Reliable fuel delivery to tower', 'Assets pan India'],
    },
  ])

  return (
    <div className="about-section">
      <img src={aboutImage1} alt="background" className="about-bg" />
      <div className="about-overlay">
        <h2>About Us</h2>
        <p>
          Need fuel anytime, anywhere? Fuel24x7 has you covered! We deliver high-quality diesel right to your doorstep,
          offering a fast, secure, and hassle-free experience. With advanced IoT and Cloud-enabled solutions, we make refueling simple and reliable.
        </p>
      </div>
      <section className='Fuel-on-Tap-Smart'>
  <div className='left-side-contant'>
    <div className='left-side-contant-heading'>
      <h1>Smart, Movable Dispenser for Diesel & Petrol</h1>
      <p>
        Fuel-on-Tap is a modern, portable fuel dispensing system built for safe and efficient delivery of both
        diesel and petrol — available in capacities ranging from 5 to 10 liters. Whether you're refueling
        a two-wheeler in the city or managing a large fleet on a construction site, Fuel-on-Tap offers flexibility,
        safety, and control at every level.
      </p>
    </div>

    <div className='features-heading'>
      <h2>Features</h2>
    </div>

    <div className='left-side-contant-Features'>
      <span><CheckCircleIcon /></span>
      <p><strong>Flexible Capacity:</strong> Supports 5–10L mini units for small deliveries.</p>

      <span><CheckCircleIcon /></span>
      <p><strong>Dual Fuel Support:</strong> Works with both diesel and petrol.</p>

      <span><CheckCircleIcon /></span>
      <p><strong>Compact & Portable:</strong> Fits easily on two-wheelers; perfect for city use.</p>

      <span><CheckCircleIcon /></span>
      <p><strong>Digital Meter:</strong> Accurately tracks the amount of fuel dispensed.</p>

      <span><CheckCircleIcon /></span>
      <p><strong>Smart Monitoring:</strong> Remote tracking enabled via smart card or app .</p>

      <span><CheckCircleIcon /></span>
      <p><strong>Secure Access:</strong> Passcode-protected keypad ensures authorized usage only.</p>
    </div>
  </div>

  <div className='right-side-contant'>
    <img src={img} alt="Fuel-on-Tap Dispenser"  className='right-side-contant'/>
  </div>
</section>

      <div className="fuel-needs">
        <h1>Fulfilling all your fuelling needs</h1>
        <div className="fuel-need-cards">
          {fuelNeeds.map((need, index) => (
            <div key={index} className="fuel-need-card">
              <img src={need.image} alt={need.title} />
              <h2>{need.title}</h2>
              {need.items.map((item, i) => (
                <p key={i}>{item}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
 <section className="timeline-container">
  <div className="timeline-header">
    <div className="header-content">
      <h3 className="header-title"> Automated Fuel Delivery Workflow </h3>
    </div>
  </div>
  <div className="timeline-content">
    <div className="timeline-item">
      <h3 className="timeline-title">Placing the Order</h3>
      <time className="timeline-count"> 1 </time>
      <p className="timeline-text">
      The customer places an order for fuel through the application, triggering the generation of a One-Time Password (OTP) as a security measure. The order, along with the OTP, is then forwarded to the preferred Mobile Diesel Operator (MDO) and their Bowser (fuel tanker).
      </p>
    </div>
    <div className="timeline-item">
      <h3 className="timeline-title">Driver & Bowser Dispatch</h3>
      <time className="timeline-count"> 2 </time>
      <p className="timeline-text">
      The driver receives the order on their app, accepts it, and confirms the delivery. The Bowser then arrives at the specified location, ready to deliver the fuel to the customer’s designated address.
      </p>
    </div>
    <div className="timeline-item">
      <h3 className="timeline-title">Fuel Delivery Authorization</h3>
      <time className="timeline-count"> 3 </time>
      <p className="timeline-text">
      The Delivery Unit (DU) stops at the ordered fuel quantity, and transaction details, including quantity and amount, are sent to the Third Party (TP). Simultaneously, an online authorization request is sent to the Fuel Control Center (FCC), and once approved, fueling begins.
      </p>
    </div>
    <div className="timeline-item">
      <h3 className="timeline-title">Security & Validation</h3>
      <time className="timeline-count"> 4 </time>
      <p className="timeline-text">
      To ensure secure fuel delivery, an OTP is generated for the customer, which must be provided before fueling begins. Additionally, GPS validation ensures that the Bowser reaches the correct location, preventing unauthorized transactions.
      </p>
    </div>
    <div className="timeline-item">
      <h3 className="timeline-title"> Transaction Completion</h3>
        <div className="timeline-wrapper">
      <time className="timeline-count"> 5</time>
      <p className="timeline-text">
        Once the OTP is verified and fueling is completed, a confirmation receipt is sent to the customer and the Fuel Control Center, marking the successful completion of the transaction.
      </p>
      </div>
      </div>
    </div>
  </section> 
  <div className='quick-support'>
  <h1>A Quick and Simple Guide to Requesting Our Support</h1>
  <div className='sub-quick-support'>
    <div className='Downlode'>
      <LanguageIcon/>
      <h2>Visit Our Application</h2>
      <p>Get started by visiting our web application for quick and convenient access to our fuel delivery services.</p>
    </div>
    <div className='Profile'>
      <AccountCircleIcon/>
      <h2>Complete Your Profile</h2>
      <p>Fill in the essential details such as name, mobile number, and location for quick assistance.</p>
    </div>
    <div className='Book Service'>
      <PhoneCallbackIcon/>
      <h2>Book Service</h2>
      <p>Go through the services and book your desired service.</p>
    </div>
  </div>
</div>
<footer className="footer">
      <div className="footer-container">
        {/* About Us */}
        <div className="footer-section">
          <h2 className="footer-title">About Us</h2>
          <p className="footer-text">
          Need fuel anytime, anywhere? Fuel24x7 has you covered! We deliver high-quality diesel right to your doorstep.
          </p>
        </div>
        <div className="footer-section">
          <h2 className="footer-title">Quick Links</h2>
          <ul className="footer-links">
          <li><Link to="/" className="link">Home</Link></li>
          <li><Link to="/services" className="link">Services</Link></li> 
          <li><Link to="/Contact" className="link">Contact</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h2 className="footer-title">Follow Us</h2>
          <div className="footer-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="icon-group">
              <FacebookIcon style={{ color: '#3b5998' }} />
              <span>Facebook</span>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="icon-group">
              <TwitterIcon style={{ color: '#1DA1F2' }} />
              <span>Twitter</span>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="icon-group">
              <InstagramIcon style={{ color: '#E4405F' }} />
              <span>Instagram</span>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
      © 2025 M Balaji Reddy. All Rights Reserved.
      </div>
    </footer>
</div>
  )
}

export default Services;


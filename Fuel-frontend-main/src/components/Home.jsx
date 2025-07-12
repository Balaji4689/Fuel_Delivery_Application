import React from 'react'
import { Link } from 'react-router-dom';
import '../App.css'

import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

import homeImage1 from '../assets/homePage.png'
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';
import MemoryIcon from '@mui/icons-material/Memory';
import { IconButton } from '@mui/material';



import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const testimonials = [
    {
      text: "I was amazed by how easy and convenient it was to order fuel from the app. The delivery was prompt, and the driver was professional. No more long waits at the gas station—this service is a game-changer!",
      author: "Sr. V.P. (Engg, BD, PPMC)",
      company: "GIFT Power Company Limited",
    },
    {
      text: "Their service has been impeccable, ensuring timely delivery and top-notch quality. I highly recommend them for their exceptional professionalism and reliability.",
      author: "Managing Director",
      company: "Green Energy Solutions",
    },
    {
      text: "Their service has been impeccable, ensuring timely delivery and top-notch quality. I highly recommend them for their exceptional professionalism and reliability.",
      author: "Managing Director",
      company: "Green Energy Solutions",
    },
  ];
  
  return (
    <>
      <div className="container">
        <img src={homeImage1} alt="Home" className='homeImage' />
        <p className="heading1">Revolutionising Fuel Delivery with Every Click</p>
        <h1 className="heading2">Redefining the Power Behind Smart & Simple Energy Distribution</h1>
      </div>

      <div className="container2">
        <div className="header">
          <h1>Five-Axis Technology-Centered Approach</h1>
          <p>Our approach centers on technology, combining ease, cashless payments, quality, quantity, and safety.</p>
        </div>
        <div className="content-wrapper">
          <div className="axis-section">
            <div className="axis-item">
              <div className="icon-container">
                <IconButton><PointOfSaleIcon className="custom-icon" /></IconButton>
              </div>
              <div className="text-container">
                <h2>Cashless Transactions</h2>
                <p>
                  Modernising fuel transactions with secure and efficient cashless options. Seamlessly complete payments for a hassle-free and convenient experience.
                </p>
              </div>
            </div>
            <div className="axis-item">
              <div className="icon-container">
                <IconButton><LocalShippingIcon className="custom-icon"/></IconButton>
              </div>
              <div className="text-container">
                <h2>Convenience</h2>
                <p>
                  Streamlined fuel delivery, user-friendly interfaces, and efficient logistics for a seamless experience. Convenience delivered to your doorstep.
                </p>
              </div>
            </div>
            <div className="axis-item">
              <div className="icon-container">
                <IconButton><SpeedIcon className="custom-icon"/></IconButton>
              </div>
              <div className="text-container">
                <h2>Quality & Quantity</h2>
                <p>
                  Precision fuel delivery, ensuring purity and accurate measurements. Elevate your fuel experience with our commitment to excellence.
                </p>
              </div>
            </div>
            <div className="axis-item">
              <div className="icon-container">
                <IconButton><SecurityIcon className="custom-icon"/></IconButton>
              </div>
              <div className="text-container">
                <h2>Safety</h2>
                <p>
                  Uncompromising safety in fuel delivery, from advanced monitoring to stringent protocols. Trust us for secure and reliable fuel services.
                </p>
              </div>
            </div>
            <div className="axis-item">
              <div className="icon-container">
                <IconButton><MemoryIcon className="custom-icon"/></IconButton>
              </div>
              <div className="text-container">
                <h2>Technology</h2>
                <p>
                  Technology plays a vital role in ensuring efficient fuel delivery and management, enabling real-time monitoring, 
                  automation, and data that drives faster and more efficient decision-making.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='Testimonials-container'>
        <div className="slider-container">
          <h2 className="slider-title">Customer Testimonials</h2>
          <Slider {...settings}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="quote-mark quote-start">&ldquo;</div>
                <p className="testimonial-text">{testimonial.text}</p>
                <p className="testimonial-author">{testimonial.author}</p>
                <p className="testimonial-company">{testimonial.company}</p>
                <div className="quote-mark quote-end">&rdquo;</div>
                </div>
              ))}
          </Slider>
    </div>
  </div>
  <section className="faq-section">
    <div className="faq-container">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      <div className="faq-content">
        <details open>
          <summary className="faq-question">How do I order fuel through the app?</summary>
          <div className="faq-answer">
            <p>Simply download the app, create an account, select the type of fuel (petrol or diesel) and your location, and schedule a delivery time. Our certified professionals will deliver the fuel safely to your doorstep.</p>
          </div>
        </details>
        <details>
          <summary className="faq-question1">Is the fuel delivery service available 24/7?</summary>
          <div className="faq-answer">
            <p>Yes, our service operates around the clock! You can order fuel anytime, and we will deliver it as per your convenience.</p>
          </div>
        </details>
        <details>
          <summary className="faq-question2">How do I know if the delivery is safe?</summary>
          <div className="faq-answer">
            <p>All our delivery professionals are certified and trained in safe fuel handling practices. We also ensure that our vehicles meet all safety standards for fuel transport.</p>
          </div>
        </details>
        <details>
          <summary className="faq-question2">Can I track my fuel delivery in real-time?</summary>
          <div className="faq-answer">
            <p>Yes! Our app provides real-time tracking, so you can follow the status of your delivery from the moment it’s dispatched until it reaches your location.</p>
          </div>
        </details>
      </div>
   </div>
</section>
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
    </>
  )
}

export default Home;

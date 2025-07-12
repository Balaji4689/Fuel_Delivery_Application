import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo-r.png' 
import '../App.css'

const Navbar = () => {
  return (
    <div className='Navbar'>
      <div className='logo'>
        <img src={logo} alt="Logo" width={50} />
      </div>
      <div className='menubar'>
        <ul>
          <li><Link to="/" className="link">Home</Link></li>
          <li><Link to="/services" className="link">Services</Link></li> 
          <li><Link to="/Contact" className="link">Contact</Link></li>
        </ul>
      </div>
      <div className='signin-button-1'>
        <Link to="/Signin">
          <button>Sign in</button>
        </Link>
      </div>
    </div>
  )
}

export default Navbar

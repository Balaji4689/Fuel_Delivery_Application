import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { API_Path } from '../Helper/ApiPath';
import '../App.css';

import GoogleIcon from '@mui/icons-material/Google';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';


const SocialMedias = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="social-icon-link">
    {children}
  </a>
);

const PetrolStationLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword , setShowPassword] =useState("false")


  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/;


    if (!emailRegex.test(email)){
      alert("Plese enter valid email address");
      return ;
    }
    if (!passwordRegex.test(password)) {
      alert("Password must be at least 6 characters long and include:\n- 1 uppercase letter\n- 1 number\n- 1 special character");
      return;
    }


    try {
      const response = await fetch(`${API_Path}/vendor/login`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('loginToken', data.token);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userRole', 'vendor');
        localStorage.setItem("vendorName", data.vendor.username);

        setEmail("");
        setPassword("");
        alert("Vendor login successful!");

        navigate('/vendorDashboard');  
      } 
    } catch (error) {

      console.error("Error:", error);
    }
  };

  return (
    <div className="login-main-container">
      <div className="login-container">
        <h1 className="login-title">Sign In - Fuel Station</h1>        
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input   type="text"  name="email"  id="email"  placeholder="Email"   className="form-input"  value={email}   onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input  type={showPassword ? "text" : "password"}  name="password"  id="password"  placeholder="Password"  className="form-input"  value={password}  onChange={(e) => setPassword(e.target.value)}  required/>
            <div className="forgot-password">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
          </div>
          <div className="show-password-toggle">
            <input  type="checkbox"  id="showPassword"  checked={showPassword}  onChange={() => setShowPassword(!showPassword)}/>
            <label htmlFor="showPassword">Show Password</label>
          </div>
          <button type="submit" className="submit-button" >Sign in
          </button>
        </form>

        <div className="social-login">
          <div className="divider"></div>
          <p>Login with social accounts</p>
          <div className="divider"></div>
        </div>

        <div className="socialmedias">
        <SocialMedias href="https://www.google.com/"><GoogleIcon fontSize="large" /></SocialMedias>
        <SocialMedias href="https://www.twitter.com/"><XIcon fontSize="large" /></SocialMedias>
        <SocialMedias href="https://www.github.com/"><InstagramIcon fontSize="large" /></SocialMedias>
        </div>

        <p className="signup-text">
          Don't have an account? <Link to="/PetrolStationRegister" className="signup-link">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default PetrolStationLogin;

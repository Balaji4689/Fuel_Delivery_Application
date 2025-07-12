
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

const DeliveryRegister = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword , setShowPassword] =useState("false")
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/;

    if (username .trim().length < 4){
      alert("UserName must be at least 3 Characters long ");
      return ;
    }

    if (!emailRegex.test(email)){
      alert("Plese enter valid email address");
      return ;
    }
    if (!passwordRegex.test(password)) {
      alert("Password must be at least 6 characters long and include:\n- 1 uppercase letter\n- 1 number\n- 1 special character");
      return;
    }

    try {
      const response = await fetch(`${API_Path}/delivery/register`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      console.log("API Response Data:", data);


      if (!response.ok) {
        throw new Error(data.message || "Registration failed.");
      }

      setUserName("");
      setEmail("");
      setPassword("");
      alert("Delivery person registered successfully!");

      navigate('/DeliveryLogin'); 

    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="Register-main-container">
      <div className="Register-container">
        <h1 className="Register-title">Sign Up - Delivery</h1>
        <form className="Register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" placeholder="Username" className="form-input"
              value={username} onChange={(e) => setUserName(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="text" id="email" placeholder="Email" className="form-input"
              value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type={showPassword ? "text" : "password"}  id="password" placeholder="Password (min 6 characters)" className="form-input"
              value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="show-password-toggle">
            <input  type="checkbox"  id="showPassword"  checked={showPassword}  onChange={() => setShowPassword(!showPassword)}/>
            <label htmlFor="showPassword">Show Password</label>
          </div>
          <button type="submit" className="submit-button" >Sign Up
          </button>
        </form>

        <div className="social-login">
          <div className="divider"></div>
          <p>Sign up with social accounts</p>
          <div className="divider"></div>
        </div>

        <div className="socialmedias">
        <SocialMedias href="https://www.google.com/"><GoogleIcon fontSize="large" /></SocialMedias>
        <SocialMedias href="https://www.twitter.com/"><XIcon fontSize="large" /></SocialMedias>
        <SocialMedias href="https://www.github.com/"><InstagramIcon fontSize="large" /></SocialMedias>
        </div>

        <p className="signup-text">
          Already have an account? <Link to="/DeliveryLogin" className="signup-link">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default DeliveryRegister;

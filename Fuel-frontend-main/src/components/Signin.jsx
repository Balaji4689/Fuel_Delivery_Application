import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

const Signin = () => {
  return (
    <div className='login-register-all-ppages'>
      <h1>Welcome to Our Fuel Delivery Service</h1>
      <h3>Choose your category to log in or register:</h3>

      <div className='mainHeadings'>
        <div className='Customer-Register'>
          <p>Sign up to create an account and order fuel delivery directly to your doorstep.</p>
          <Link to="/customerregister">Customer Register</Link>
        </div>

        <div className='Customer-Login'>
          <p>If you already have an account, sign in here to access your dashboard and manage your orders.</p>
          <Link to="/customerlogin">Customer Login</Link> 
        </div>

        <div className='Petrol-Station-Register'>
          <p>Petrol stations can register here to add their inventory and manage orders.</p>
          <Link to="/petrolstationregister">Vendor Register</Link>
        </div>

        <div className='Petrol-Station-Login'>
          <p>If you already have an account, log in to manage your station's inventory and orders.</p>
          <Link to="/petrolstationLogin">Vendor Login</Link>
        </div>

        <div className='Delivery-Register'>
          <p>Register as a delivery partner and start delivering fuel to customers.</p>
          <Link to="/deliveryregister">Delivery Partner Register</Link>
        </div>

        <div className='Delivery-Login'>
          <p>If you are already a registered delivery partner, log in here to view and manage delivery requests.</p>
          <Link to="/deliverylogin">Delivery Partner Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Signin;


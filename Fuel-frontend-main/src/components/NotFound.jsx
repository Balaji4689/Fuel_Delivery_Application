import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; 

const NotFound = () => {
  return (
    <div className="notfound-wrapper">
      <div className="notfound-container">
        <h1 className="notfound-title">404 - Page Not Found</h1>
        <p className="notfound-text">
          Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link to="/" className="notfound-button">
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

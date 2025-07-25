import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem('loginToken');

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />; 
};

export default ProtectedRoute;

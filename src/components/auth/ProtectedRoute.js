// src/components/auth/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom'; // Use Navigate instead of Redirect

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token');

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;


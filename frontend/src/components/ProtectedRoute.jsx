import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiresAdmin = false }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token) {
    return <Navigate to={requiresAdmin ? "/admin/login" : "/login"} replace />;
  }

  if (requiresAdmin && role !== 'admin') {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

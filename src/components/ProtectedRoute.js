import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    // Si no hay token, redirigir a la página de inicio de sesión
    return <Navigate to="/" replace />;
  }
  // Si hay token, renderizar el componente hijo
  return children;
};

export default ProtectedRoute;

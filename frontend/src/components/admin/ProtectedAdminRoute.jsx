// frontend/src/admin/ProtectedAdminRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedAdminRoute({ children }) {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/admin/login" replace />;
  // Optionally decode token and check role client-side
  return children;
}

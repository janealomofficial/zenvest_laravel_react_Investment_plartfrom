import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * ProtectedRoute restricts access to its children based on the user's
 * authentication status and role. Provide an array of roles via the
 * `roles` prop to allow access only to those roles. If no roles are
 * provided, any authenticated user is allowed. Unauthenticated users
 * are redirected to the login page.
 */
const ProtectedRoute = ({ roles = [], children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  // If not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If roles prop specified and user's role isn't included, redirect to generic dashboard
  if (roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  // Otherwise, render children
  return children;
};

export default ProtectedRoute;
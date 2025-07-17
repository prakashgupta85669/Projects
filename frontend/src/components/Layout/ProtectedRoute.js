import React from 'react';
import { Navigate } from 'react-router-dom';
import { isLoggedIn, getAuthData } from '../../services/auth';

const ProtectedRoute = ({ component: Component, role }) => {
  const loggedIn = isLoggedIn();
  const { user } = getAuthData();

  if (!loggedIn) {
    return <Navigate to="/login" />;
  }

  if (role && user?.userType !== role) {
    return <Navigate to="/login" />;
  }

  return <Component />;
};

export default ProtectedRoute;

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function PrivateRoute({ children }) {
  const { getUser, userIsAuthenticated } = useAuth();
  const location = useLocation();

  const user = getUser();
  const role = user?.role;

  if (userIsAuthenticated() && role && role !== 'USER') {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
}

export default PrivateRoute;

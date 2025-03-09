import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function PrivateRoute({ showForUseer, children }) {
  const { getUser, userIsAuthenticated } = useAuth();
  const location = useLocation();

  const user = getUser();
  const role = user?.role;

  if (userIsAuthenticated() && role && role !== 'USER') {
    return children;
  }

  console.log(role);
  if (userIsAuthenticated() && role && role !== 'GUEST') {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
}

export default PrivateRoute;

import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, roles }) => {
  const { user } = useSelector((state) => state.auth);
  console.log('User in PrivateRoute:', user);

  // Redirect if no user is found (i.e., not logged in)
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Redirect if the user's role is not in the allowed roles
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return children; // Render the children components if everything is fine
};

export default PrivateRoute;

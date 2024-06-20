import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const token = localStorage.getItem('token');
  return token ? <Component {...rest} /> : <Navigate to="/" />;
};

export default ProtectedRoute;

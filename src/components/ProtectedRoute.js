import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const user = await AuthService.getCurrentUser();
      setIsAuthenticated(!!user);
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) return <div>Loading...</div>;

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
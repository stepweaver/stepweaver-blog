import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const auth = useSelector((state) => state.auth);
  const loading = useSelector((state) => state.auth.loading);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuthenticated && !loading) {
      navigate('/login');
    }
  }, [auth, navigate]);

  return auth.isAuthenticated && !loading ? children : null;
};

export default PrivateRoute;

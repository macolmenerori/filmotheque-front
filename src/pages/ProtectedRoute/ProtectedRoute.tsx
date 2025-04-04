import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router';

import { authApi } from '../../api';
import LoadingSpinner from '../../common/components/LoadingSpinner/LoadingSpinner';

/**
 * Page that checks if the user is logged in. If they are, it renders the children components. If not, it redirects to the login page.
 *
 * @returns {JSX.Element} ProtectedRoute component
 */
const ProtectedRoute = () => {
  const [auth, setAuth] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await authApi.get('/v1/users/isloggedin');
        setAuth(true);
      } catch (err) {
        setAuth(false);
      }
    };

    checkAuth();
  }, []);

  if (auth === null) {
    return <LoadingSpinner />;
  }

  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;

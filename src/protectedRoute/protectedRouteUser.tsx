'use client';

import React from 'react';
import { AuthUser } from '@/firebase/auth/authProvider';
import { redirect } from 'next/navigation';

const ProtectedRouterUser = ({ children }: { children: React.ReactNode }) => {
  const { userActive } = AuthUser();
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    const checkAuth = () => {
      if (userActive) {
        setIsAuthenticated(false);
        redirect('/dashboard');
      } else if (userActive === false) {
        setIsAuthenticated(true);
      }
    };
    checkAuth();
  }, [userActive]);

  if (isAuthenticated) return children;
  else return null;
};

export default ProtectedRouterUser;

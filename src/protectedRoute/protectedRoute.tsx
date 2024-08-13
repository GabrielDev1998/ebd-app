'use client';

import { AuthUser } from '@/firebase/auth/authProvider';
import { redirect } from 'next/navigation';
import React from 'react';

const ProtectedRouter = ({ children }: { children: React.ReactNode }) => {
  const { userActive } = AuthUser();
  const [authentication, setAuthentication] = React.useState(false);

  React.useEffect(() => {
    const checkAuth = () => {
      if (userActive) {
        setAuthentication(true);
      } else if (userActive === false) {
        setAuthentication(false);
        redirect('/auth/login');
      }
    };
    checkAuth();
  }, [userActive]);

  if (authentication) return children;
  else return null;
};

export default ProtectedRouter;

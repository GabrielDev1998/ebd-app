import Login from '@/components/pages/auth/login/login';
import ProtectedRouterUser from '@/protectedRoute/protectedRouteUser';

import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EBD | Entrar',
  description: 'Entrar na plataforma EBD',
};

export default function PageLogin() {
  return <ProtectedRouterUser>
    <Login />
  </ProtectedRouterUser>;
}

import Create from '@/components/pages/auth/create/create';
import ProtectedRouterUser from '@/protectedRoute/protectedRouteUser';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EBD | Criar conta',
  description: 'Criar uma conta na EBD',
};

export default function PageCreate() {
  return (
    <ProtectedRouterUser>
      <Create />
    </ProtectedRouterUser>
  );
}

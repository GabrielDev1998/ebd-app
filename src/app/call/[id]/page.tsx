import { LayoutContext } from '@/components/globalLayout/layout-context';
import Call from '@/components/pages/call/call';
import ProtectedRouter from '@/protectedRoute/protectedRoute';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EBD | Chamada',
  description: 'Realizar a chamada dos alunos',
};

export default function PageCall() {
  return (
    <ProtectedRouter>
      <LayoutContext>
        <Call />
      </LayoutContext>
    </ProtectedRouter>
  );
}

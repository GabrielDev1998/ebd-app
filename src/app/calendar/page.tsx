import type { Metadata } from 'next';
import { LayoutContext } from '@/components/globalLayout/layout-context';
import ProtectedRouter from '@/protectedRoute/protectedRoute';
import Aulas from '@/components/pages/aulas/aulas';

export const metadata: Metadata = {
  title: 'EBD | Aulas',
  description: 'Todas as aulas realizadas durante o ano',
};

export default function PageAulas() {
  return (
    <ProtectedRouter>
      <LayoutContext>
        <Aulas />
      </LayoutContext>
    </ProtectedRouter>
  );
}

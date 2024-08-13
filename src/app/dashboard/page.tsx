import type { Metadata } from 'next';
import Dashboard from '@/components/pages/dashboard/dashboard';
import { LayoutContext } from '@/components/globalLayout/layout-context';
import ProtectedRouter from '@/protectedRoute/protectedRoute';

export const metadata: Metadata = {
  title: 'EBD | Dashboard',
  description:
    'Dashboards, aniversariantes do dia, mês e trimestre, ranking dos alunos e muito mais.',
};

export default function PageDashboard() {
  return (
    <ProtectedRouter>
      <LayoutContext>
        <Dashboard />
      </LayoutContext>
    </ProtectedRouter>
  );
}

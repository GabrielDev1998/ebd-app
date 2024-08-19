import { LayoutContext } from '@/components/globalLayout/layout-context';
import Progress from '@/components/pages/students/progress/progress';
import ProtectedRouter from '@/protectedRoute/protectedRoute';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EBD | Progresso do aluno',
  description: 'Progresso do aluno ao decorrer do ano',
};

export default function PageProgress() {
  return (
    <ProtectedRouter>
      <LayoutContext>
        <Progress />
      </LayoutContext>
    </ProtectedRouter>
  );
}

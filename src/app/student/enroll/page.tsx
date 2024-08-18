import type { Metadata } from 'next';
import Enroll from '@/components/pages/students/enroll/enroll';
import { LayoutContext } from '@/components/globalLayout/layout-context';
import ProtectedRouter from '@/protectedRoute/protectedRoute';

export const metadata: Metadata = {
  title: 'EBD | Matricular',
  description: 'Matricular alunos na EBD',
};

export default function PageEnroll() {
  return (
    <ProtectedRouter>
      <LayoutContext>
        <Enroll />
      </LayoutContext>
    </ProtectedRouter>
  );
}

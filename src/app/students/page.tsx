import { LayoutContext } from '@/components/globalLayout/layout-context';
import type { Metadata } from 'next';

import Students from '@/components/pages/students/students';
import ProtectedRouter from '@/protectedRoute/protectedRoute';

export const metadata: Metadata = {
  title: 'EBD | Alunos',
  description: 'Alunos matriculados na EBD',
};

export default function PageStudents() {
  return (
    <ProtectedRouter>
      <LayoutContext>
        <Students />
      </LayoutContext>
    </ProtectedRouter>
  );
}

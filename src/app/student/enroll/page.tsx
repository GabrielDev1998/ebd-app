import type { Metadata } from 'next';
import Enroll from '@/components/pages/students/enroll/enroll';
import { LayoutContext } from '@/components/globalLayout/layout-context';
import ProtectedRouter from '@/protectedRoute/protectedRoute';
import { StudentFormContext } from '@/components/pages/students/formStudent/student-context';

export const metadata: Metadata = {
  title: 'EBD | Matricular',
  description: 'Matricular alunos na EBD',
};

export default function PageEnroll() {
  return (
    <ProtectedRouter>
      <LayoutContext>
        <StudentFormContext>
          <Enroll />
        </StudentFormContext>
      </LayoutContext>
    </ProtectedRouter>
  );
}

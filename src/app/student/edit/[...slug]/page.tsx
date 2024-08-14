import ProtectedRouter from '@/protectedRoute/protectedRoute';
import Edit from '@/components/pages/students/edit/edit';
import { LayoutContext } from '@/components/globalLayout/layout-context';
import { StudentFormContext } from '@/components/pages/students/formStudent/student-context';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EBD | Editar dados',
  description: 'Editar dados do aluno',
};

export default function PageEdit() {
  return (
    <ProtectedRouter>
      <LayoutContext>
        <StudentFormContext>
          <Edit />
        </StudentFormContext>
      </LayoutContext>
    </ProtectedRouter>
  );
}

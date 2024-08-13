import { LayoutContext } from '@/components/globalLayout/layout-context';
import Settings from '@/components/settings/settings';

import ProtectedRouter from '@/protectedRoute/protectedRoute';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EBD | Configurações',
};

export default function Page() {
  return (
    <ProtectedRouter>
      <LayoutContext>
        <Settings />
      </LayoutContext>
    </ProtectedRouter>
  );
}

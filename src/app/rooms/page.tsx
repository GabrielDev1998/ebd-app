import { LayoutContext } from '@/components/globalLayout/layout-context';
import Rooms from '@/components/pages/rooms/rooms';
import ProtectedRouter from '@/protectedRoute/protectedRoute';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EBD | Salas',
  description: 'Salas matriculadas na EBD',
};

export default function PageRooms() {
  return (
    <ProtectedRouter>
      <LayoutContext>
        <Rooms />
      </LayoutContext>
    </ProtectedRouter>
  );
}

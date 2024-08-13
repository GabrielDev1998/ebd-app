import Forgot from '@/components/pages/auth/forgot/forgot';

import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EBD | Recuperação de conta',
  description: 'Recuperar a conta',
};

export default function PageForgot() {
  return <Forgot />;
}

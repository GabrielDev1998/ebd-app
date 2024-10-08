import type { Metadata } from 'next';
import { Nunito_Sans } from 'next/font/google';
import './globals.css';
import { AuthContext } from '@/firebase/auth/authProvider';
import { ThemeContext } from '@/providers/theme/theme-context';

const fontPrimary = Nunito_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'EBD | Gestão de Alunos',
  description: 'Gestão de alunos, dashboards, relatórios, chamadas.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={fontPrimary.className}>
        <AuthContext>
          <ThemeContext>{children}</ThemeContext>
        </AuthContext>
      </body>
    </html>
  );
}

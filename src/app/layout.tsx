import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/components/Providers';

export const metadata: Metadata = {
  title: 'Homestead Sandbox',
  description: 'MERN Refresh Sandbox',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='eng'>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

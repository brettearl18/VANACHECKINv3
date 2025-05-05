import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ClientRoot from '../components/layouts/ClientRoot';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'VanaCheckIn - Coaching Platform',
  description: 'A scalable, secure, and delightful coaching platform for coaches and clients.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientRoot>{children}</ClientRoot>
      </body>
    </html>
  );
} 
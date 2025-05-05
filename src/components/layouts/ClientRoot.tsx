'use client';

import { ReactNode } from 'react';
import { AuthProvider } from '../../store/AuthContext';
import MainLayout from './MainLayout';

export default function ClientRoot({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <MainLayout>{children}</MainLayout>
    </AuthProvider>
  );
} 
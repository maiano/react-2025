'use client';

import dynamic from 'next/dynamic';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Fallback } from '@/components/Fallback';

const App = dynamic(() => import('../../App'), { ssr: false });

export function ClientOnly() {
  return (
    <ErrorBoundary fallback={<Fallback />}>
      <App />
    </ErrorBoundary>
  );
}

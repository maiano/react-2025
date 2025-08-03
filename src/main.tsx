import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { FallBack } from '@/components/FallBack/';
import { ThemeProvider } from '@/context/ThemeProvider.tsx';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary fallback={<FallBack />}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>,
);

import { Metadata } from 'next';
import './globals.css';
// import { ErrorBoundary } from '@/components/ErrorBoundary';
// import { Fallback } from '@/components/Fallback';
import { ThemeProvider } from '@/context/ThemeProvider';

export const metadata: Metadata = {
  title: 'Rick and Morty',
  description: 'Rick and Morty App',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/icon.png" />
      </head>
      <body>
        {/* <ErrorBoundary fallback={<Fallback />}> */}
        <ThemeProvider>{children}</ThemeProvider>
        {/* </ErrorBoundary> */}
      </body>
    </html>
  );
}

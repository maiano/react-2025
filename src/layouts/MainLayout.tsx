import { Outlet } from 'react-router';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

export const MainLayout = () => {
  return (
    <div className="flex min-h-screen bg-white">
      <div className="w-full max-w-7xl flex flex-col bg-gray-100 mx-auto">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

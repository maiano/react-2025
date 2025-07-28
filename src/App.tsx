import { createBrowserRouter, RouterProvider } from 'react-router';
import { ROUTES } from '@/app/routes';
import { FallBack } from '@/components/FallBack';
import { MainLayout } from '@/layouts/MainLayout';
import { AboutPage } from '@/pages/AboutPage';
import { HomePage } from '@/pages/HomePage';
import { homePageLoader } from '@/pages/HomePage/HomePage.loader';
import { NotFoundPage } from '@/pages/NotFoundPage';

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <MainLayout />,
    errorElement: <FallBack />,
    children: [
      { index: true, element: <HomePage />, loader: homePageLoader },
      { path: ROUTES.ABOUT, element: <AboutPage /> },
      { path: ROUTES.NOT_FOUND, element: <NotFoundPage /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

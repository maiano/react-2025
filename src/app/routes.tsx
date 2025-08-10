import { Navigate } from 'react-router';
import { PATHS } from '@/app/paths';
import { Fallback } from '@/components/Fallback';
import { ErrorLayout } from '@/layouts/ErrorLayout';
import { MainLayout } from '@/layouts/MainLayout';
import { AboutPage } from '@/pages/AboutPage';
import { HomePage } from '@/pages/HomePage';
import { NotFoundPage } from '@/pages/NotFoundPage';

export const routes = [
  {
    path: PATHS.HOME,
    element: <Navigate to={PATHS.CHARACTER} replace />,
  },
  {
    path: PATHS.CHARACTER,
    element: <MainLayout />,
    errorElement: <Fallback />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: PATHS.CHARACTERID,
        element: <HomePage />,
      },
    ],
  },
  {
    path: PATHS.ABOUT,
    element: <MainLayout />,
    errorElement: <Fallback />,
    children: [{ index: true, element: <AboutPage /> }],
  },
  {
    path: PATHS.NOT_FOUND,
    element: <ErrorLayout />,
    errorElement: <Fallback />,
    children: [{ path: PATHS.NOT_FOUND, element: <NotFoundPage /> }],
  },
];

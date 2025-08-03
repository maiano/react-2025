import { Navigate } from 'react-router';
import { PATHS } from '@/app/paths';
import { FallBack } from '@/components/FallBack';
import { ErrorLayout } from '@/layouts/ErrorLayout';
import { MainLayout } from '@/layouts/MainLayout';
import { AboutPage } from '@/pages/AboutPage';
import { HomePage } from '@/pages/HomePage';
import { NotFoundPage } from '@/pages/NotFoundPage';

export const routes = [
  {
    path: '/',
    element: <Navigate to={PATHS.CHARACTER} replace />,
  },
  {
    path: '/character',
    element: <MainLayout />,
    errorElement: <FallBack />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: ':characterId',
        element: <HomePage />,
      },
    ],
  },
  {
    path: PATHS.ABOUT,
    element: <MainLayout />,
    errorElement: <FallBack />,
    children: [{ index: true, element: <AboutPage /> }],
  },
  {
    path: PATHS.NOT_FOUND,
    element: <ErrorLayout />,
    errorElement: <FallBack />,
    children: [{ path: PATHS.NOT_FOUND, element: <NotFoundPage /> }],
  },
];

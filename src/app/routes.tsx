import { PATHS } from '@/app/paths';
import { FallBack } from '@/components/FallBack';
import { ErrorLayout } from '@/layouts/ErrorLayout';
import { MainLayout } from '@/layouts/MainLayout';
import { AboutPage } from '@/pages/AboutPage';
import { HomePage } from '@/pages/HomePage';
import { NotFoundPage } from '@/pages/NotFoundPage';

export const routes = [
  {
    path: PATHS.HOME,
    element: <MainLayout />,
    errorElement: <FallBack />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'character/:characterId',
        element: <HomePage />,
      },
      { path: PATHS.ABOUT, element: <AboutPage /> },
    ],
  },
  {
    path: PATHS.NOT_FOUND,
    element: <ErrorLayout />,
    errorElement: <FallBack />,
    children: [{ path: PATHS.NOT_FOUND, element: <NotFoundPage /> }],
  },
];

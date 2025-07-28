import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router';
import { describe, it, expect } from 'vitest';
import { ROUTES } from '@/app/routes';
import { FallBack } from '@/components/FallBack';
import { MainLayout } from '@/layouts/MainLayout';
import { AboutPage } from '@/pages/AboutPage';
import { HomePage } from '@/pages/HomePage';
import { homePageLoader } from '@/pages/HomePage/HomePage.loader';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { UI_STRINGS } from '@/shared/constants/ui-strings';

const routes = [
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
];

describe('App component', () => {
  it('renders search button from SearchBar', async () => {
    const testRouter = createMemoryRouter(routes, {
      initialEntries: ['/'],
    });

    render(<RouterProvider router={testRouter} />);

    expect(
      await screen.findByText(UI_STRINGS.searchButton),
    ).toBeInTheDocument();
  });
});

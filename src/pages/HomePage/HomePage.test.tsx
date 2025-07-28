import { render, screen, waitFor } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { describe, expect, it, vi } from 'vitest';
import { HomePage } from './HomePage';
import { homePageLoader } from './HomePage.loader';
import { FallBack } from '@/components/FallBack';
import { MainLayout } from '@/layouts/MainLayout';
import { mockCharacters } from '@/tests/mockCharacters';

vi.mock('./HomePage.loader', () => ({
  homePageLoader: () => ({
    data: {
      results: mockCharacters.results,
      info: mockCharacters.info,
    },
    page: 1,
    searchQuery: '',
  }),
}));

describe('HomePage via routing', () => {
  it('renders characters from loader', async () => {
    const router = createMemoryRouter(
      [
        {
          path: '/',
          element: <MainLayout />,
          errorElement: <FallBack />,
          children: [
            {
              index: true,
              element: <HomePage />,
              loader: homePageLoader,
            },
          ],
        },
      ],
      {
        initialEntries: ['/'],
      },
    );

    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(
        screen.getByText(mockCharacters.results[0].name),
      ).toBeInTheDocument();
    });
  });
});

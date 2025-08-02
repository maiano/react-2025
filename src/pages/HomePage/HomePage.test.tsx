import { render, screen, waitFor } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { describe, expect, it, vi } from 'vitest';
import { HomePage } from './HomePage';
import { FallBack } from '@/components/FallBack';
import { MainLayout } from '@/layouts/MainLayout';
import { mockCharacters } from '@/tests/mockCharacters';

vi.mock('@/hooks/useCharactersQuery', () => ({
  useCharactersQuery: () => ({
    data: {
      results: mockCharacters.results,
      info: mockCharacters.info,
    },
    isLoading: false,
    isError: false,
    error: null,
    refetch: vi.fn(),
  }),
}));

describe('HomePage via routing', () => {
  it('renders characters from query', async () => {
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
            },
          ],
        },
      ],
      {
        initialEntries: ['/?name=rick'],
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

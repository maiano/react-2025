import { render, screen, waitFor } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { describe, expect, it, vi, beforeAll } from 'vitest';
import { HomePage } from './HomePage';
import { mockCharacters } from '@/tests/mockCharacters';

describe('HomePage', () => {
  beforeAll(() => {
    vi.mock('@/hooks/useCharactersQuery', () => ({
      useCharactersQuery: () => ({
        data: mockCharacters,
        isLoading: false,
        isError: false,
        error: null,
        refetch: vi.fn(),
      }),
    }));
  });

  it('renders characters from query', async () => {
    const router = createMemoryRouter(
      [
        {
          path: '/character',
          element: <HomePage />,
        },
      ],
      {
        initialEntries: ['/character?name=rick'],
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

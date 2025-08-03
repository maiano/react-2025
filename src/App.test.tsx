import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router';
import { describe, it, expect } from 'vitest';
import { routes } from '@/app/routes';

describe('App component', () => {
  it('renders Fallback when error occurs', async () => {
    const queryClient = new QueryClient();
    const testRouter = createMemoryRouter(routes, {
      initialEntries: ['/error'],
    });

    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={testRouter} />
      </QueryClientProvider>,
    );

    expect(await screen.findByText(/seriously\?/i)).toBeInTheDocument();
  });
});

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Footer } from './Footer';

describe('Footer', () => {
  it('renders both buttons', () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <Footer />
      </QueryClientProvider>,
    );

    expect(
      screen.getByRole('button', { name: /refresh/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /break/i })).toBeInTheDocument();
  });
});

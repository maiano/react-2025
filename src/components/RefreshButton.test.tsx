import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { RefreshButton } from '@/components/RefreshButton';

describe('RefreshButton', () => {
  it('calls invalidateQueries with the correct queryKey', () => {
    const queryClient = new QueryClient();
    const spy = vi.spyOn(queryClient, 'invalidateQueries');

    render(
      <QueryClientProvider client={queryClient}>
        <RefreshButton queryKey={['characters']} />
      </QueryClientProvider>,
    );

    fireEvent.click(screen.getByRole('button', { name: /refresh/i }));
    expect(spy).toHaveBeenCalledWith({ queryKey: ['characters'] });
  });
});

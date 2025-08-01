import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router';
import { describe, it, expect } from 'vitest';
import { routes } from '@/app/routes';
import { UI_STRINGS } from '@/shared/constants/ui-strings';

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

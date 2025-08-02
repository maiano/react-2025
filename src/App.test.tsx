import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router';
import { describe, it, expect } from 'vitest';
import { routes } from '@/app/routes';
import { UI_STRINGS } from '@/shared/constants/ui-strings';

describe('App component', () => {
  it('renders ErrorLayout with Header and NotFoundPage', async () => {
    const testRouter = createMemoryRouter(routes, {
      initialEntries: ['/error'],
    });

    render(<RouterProvider router={testRouter} />);

    expect(await screen.findByAltText(UI_STRINGS.altLogo)).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: UI_STRINGS.title }),
    ).toBeInTheDocument();
  });
});

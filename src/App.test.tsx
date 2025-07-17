import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { UI_STRINGS } from '@/shared/constants/ui-strings';

describe('App component', () => {
  it('renders components', () => {
    render(<App />);
    expect(screen.getByText(UI_STRINGS.title)).toBeInTheDocument();
  });

  it('throw the error with the button', () => {
    render(
      <ErrorBoundary fallback={<div>App down</div>}>
        <App />
      </ErrorBoundary>,
    );

    const errorButton = screen.getByText(UI_STRINGS.errorButton);

    fireEvent.click(errorButton);

    expect(screen.getByText(/App down/i)).toBeInTheDocument();
  });
});

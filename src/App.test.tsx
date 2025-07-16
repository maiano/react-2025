import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';
import { UI_STRINGS } from '@/shared/constants/ui-strings';

describe('App component', () => {
  it('renders components', () => {
    render(<App />);
    expect(screen.getByText(UI_STRINGS.title)).toBeInTheDocument();
  });
});

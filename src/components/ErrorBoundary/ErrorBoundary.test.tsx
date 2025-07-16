import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import { ErrorBoundary } from './ErrorBoundary';

const ThrowComponent = () => {
  throw new Error('Test error');
};

const Fallback = () => <div>unexpected error</div>;

describe('ErrorBoundary tests', () => {
  const originalError = console.error;
  beforeAll(() => {
    console.error = vi.fn();
  });

  afterAll(() => {
    console.error = originalError;
  });

  it('renders fallback on error', () => {
    render(
      <ErrorBoundary fallback={<Fallback />}>
        <ThrowComponent />
      </ErrorBoundary>,
    );

    expect(screen.getByText(/unexpected error/i)).toBeInTheDocument();
  });

  it('renders children', () => {
    const NO_ERROR = 'there is no error';
    render(
      <ErrorBoundary fallback={<Fallback />}>
        <div>{NO_ERROR}</div>
      </ErrorBoundary>,
    );

    expect(screen.getByText(NO_ERROR)).toBeInTheDocument();
  });
});

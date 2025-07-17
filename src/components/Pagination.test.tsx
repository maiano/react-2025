import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Pagination } from './Pagination';

describe('Pagination', () => {
  it('render button if total ≤ MAX_PAGES', () => {
    const onChange = vi.fn();
    render(<Pagination total={5} value={1} onChange={onChange} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('render text if > MAX_PAGES', () => {
    const onChange = vi.fn();
    render(<Pagination total={10} value={4} onChange={onChange} />);
    expect(screen.getByText(/Dimension 4 of 10/)).toBeInTheDocument();
  });
});

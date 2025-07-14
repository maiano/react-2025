import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { SearchBar } from './SearchBar';

describe('SearchBar component', () => {
  const setup = (props = {}) => {
    const onSearch = vi.fn();
    const utils = render(
      <SearchBar onSearch={onSearch} loading={false} term="Rick" {...props} />,
    );

    const input = screen.getByPlaceholderText(/pickle/i);
    const button = screen.getByRole('button', { name: /scan/i });

    return {
      input,
      button,
      onSearch,
      ...utils,
    };
  };

  it('renders input and button', () => {
    const { input, button } = setup();
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('renders initial term in input', () => {
    const { input } = setup({ term: 'Morty' });
    expect(input).toHaveValue('Morty');
  });

  it('updates input value on user input', () => {
    const { input } = setup();
    fireEvent.change(input, { target: { value: 'Summer' } });
    expect(input).toHaveValue('Summer');
  });

  it('calls onSearch with trimmed input on submit', () => {
    const { input, button, onSearch } = setup();
    fireEvent.change(input, { target: { value: '  Morty ' } });
    fireEvent.click(button);
    expect(onSearch).toHaveBeenCalledWith('Morty');
  });

  it('disables input and button when loading is true', () => {
    const { input, button } = setup({ loading: true });
    expect(input).toBeDisabled();
    expect(button).toBeDisabled();
  });
});

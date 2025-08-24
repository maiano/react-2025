import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { afterEach } from 'vitest';
import App from '@/App';
import { useFormStore } from '@/shared/store/useFormStore';

afterEach(() => {
  useFormStore.setState({
    uncontrolledForms: null,
    controlledForms: null,
  });
});

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByText('React Forms')).toBeInTheDocument();
  });

  it('opens controlled modal on button click', async () => {
    render(<App />);
    const button = screen.getByText('Open Controlled Form');
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });

  it('opens uncontrolled modal on button click', async () => {
    render(<App />);
    const button = screen.getByText('Open Uncontrolled Form');
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });

  it('controlled form submits and displays tile', async () => {
    render(<App />);
    const openButton = screen.getByText('Open Controlled Form');
    fireEvent.click(openButton);

    fireEvent.input(screen.getByLabelText(/Name/i), {
      target: { value: 'John' },
    });
    fireEvent.input(screen.getByLabelText(/Age/i), {
      target: { value: 25 },
    });
    fireEvent.input(screen.getByLabelText(/Email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.input(screen.getByLabelText('Password'), {
      target: { value: 'Qwerty123!' },
    });
    fireEvent.input(screen.getByLabelText('Confirm Password'), {
      target: { value: 'Qwerty123!' },
    });

    const maleRadio = screen
      .getAllByRole('radio')
      .find((radio) => radio.getAttribute('value') === 'male');
    fireEvent.click(maleRadio!);

    fireEvent.click(screen.getByLabelText('I accept Terms & Conditions'));

    fireEvent.input(screen.getByLabelText(/Country/i), {
      target: { value: 'Ru' },
    });

    const submit = screen.getByText(/submit/i);
    fireEvent.click(submit);
  });
});

import { Component, type InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export class Input extends Component<InputProps> {
  render() {
    const { className = '', type = 'text', ...rest } = this.props;

    return (
      <input
        type={type}
        className={`w-full bg-gray-200 px-3 py-2 text-sm outline-none focus:ring focus:ring-gray-100 disabled:pointer-events-none disabled:opacity-50 ${className}`}
        {...rest}
      />
    );
  }
}

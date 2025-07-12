import { Component, type ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary';
  size?: 'sm' | 'default';
  className?: string;
}

export class Button extends Component<ButtonProps> {
  render() {
    const {
      variant = 'default',
      size = 'default',
      className = '',
      ...rest
    } = this.props;

    let baseClasses =
      'inline-flex items-center justify-center text-sm transition-colors focus:outline-none focus:ring focus:ring-gray-300 disabled:opacity-50 disabled:pointer-events-none';

    let variantClasses =
      variant === 'secondary'
        ? 'bg-gray-300 text-gray-800 hover:bg-gray-400'
        : 'bg-gray-200 hover:bg-gray-400';

    let sizeClasses = size === 'sm' ? 'h-8 w-8 px-4' : 'h-9 px-4 min-sm:px-6';

    return (
      <button
        className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
        {...rest}
      >
        {this.props.children}
      </button>
    );
  }
}

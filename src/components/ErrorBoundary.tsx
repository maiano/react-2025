import { Component, type ReactNode, type ErrorInfo } from 'react';
import summer from '@/assets/Rick-And-Morty-PNG-Pic-Background.png';
import { Button } from '@/components/Button';
import { ERROR_UI_STRINGS } from '@/shared/constants/errors';

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('Uncaught error:', error, info);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="mt-16 flex flex-col items-center text-center px-4 text-red-400">
          <img
            src={summer}
            alt={ERROR_UI_STRINGS.imageAlt}
            className="w-48 h-auto mb-6"
          />
          <h2 className="text-2xl font-bold mb-2 font-mono">
            {ERROR_UI_STRINGS.heading}
          </h2>
          <p className="text-xl mb-4 max-w-xl font-mono">
            {ERROR_UI_STRINGS.description}
          </p>
          <Button
            onClick={() => window.location.reload()}
            className="text-gray-700 "
          >
            {ERROR_UI_STRINGS.buttonText}
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

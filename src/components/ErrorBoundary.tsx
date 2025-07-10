import { Component, type ReactNode, type ErrorInfo } from 'react';
import summer from '@/assets/Rick-And-Morty-PNG-Pic-Background.png';
import { Button } from '@/components/Button';

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
        <div className="mt-16 flex flex-col items-center text-center px-4 text-red-500">
          <img src={summer} alt="Summer" className="w-48 h-auto mb-6" />
          <h2 className="text-3xl font-bold mb-2 font-caveat">
            Ugh... something totally broke!
          </h2>
          <p className="font-caveat text-2xl mb-4 max-w-md">
            I literally cannot believe this just happened. Try refreshing or
            like... tell Morty...
          </p>
          <Button
            onClick={() => window.location.reload()}
            className="text-gray-700"
          >
            Tell Morty
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

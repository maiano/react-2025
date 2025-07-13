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
        <div className="mt-16 flex flex-col items-center text-center px-4 text-red-400">
          <img
            src={summer}
            alt="Summer in shock"
            className="w-48 h-auto mb-6"
          />
          <h2 className="text-2xl font-bold mb-2 font-mono">
            Seriously? You crashed the multiverse’s mainframe!
          </h2>
          <p className="text-xl mb-4 max-w-xl font-mono">
            Like, this is lamer than Rick’s parenting or Morty’s entire
            existence. Smash the button, or be a loser who looks stuff up!
          </p>
          <Button
            onClick={() => window.location.reload()}
            className="text-gray-700 "
          >
            Reset the Multiverse
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

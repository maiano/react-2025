import { Component, type ReactNode, type ErrorInfo } from 'react';

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
        <div className="mt-8 text-center text-red-500">
          <h2 className="text-xl">Something went wrong</h2>
          <p>Please reload the page or try again later</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

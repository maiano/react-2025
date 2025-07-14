import { Component, type ReactNode, type ErrorInfo } from 'react';
import summerImage from '@/assets/Rick-And-Morty-PNG-Pic-Background.png';
import { FallBack } from '@/components/FallBack';

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
      return <FallBack imageSrc={summerImage} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

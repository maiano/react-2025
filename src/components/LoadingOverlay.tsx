import { Component, type ReactNode } from 'react';

type LoadingOverlayProps = {
  show: boolean;
  children?: ReactNode;
};

export class LoadingOverlay extends Component<LoadingOverlayProps> {
  render() {
    const { show, children } = this.props;

    if (!show) return null;

    return (
      <div className="fixed inset-0 z-50 bg-black/25 flex items-center justify-center">
        {children ?? (
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-700" />
        )}
      </div>
    );
  }
}

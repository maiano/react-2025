import { ErrorBoundaryTesterButton } from '@/components/ErrorBoundaryTesterButton';
import { RefreshButton } from '@/components/RefreshButton';

export const Footer = () => {
  return (
    <footer className="px-4 pb-4 flex justify-end gap-4">
      <RefreshButton queryKey={['characters']} />
      <ErrorBoundaryTesterButton />
    </footer>
  );
};

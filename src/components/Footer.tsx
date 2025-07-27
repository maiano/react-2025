import { Button } from '@/components/Button';
import { UI_STRINGS } from '@/shared/constants/ui-strings';

type FooterProps = {
  onThrowError: () => void;
};

export const Footer = ({ onThrowError }: FooterProps) => {
  return (
    <footer className="px-4 pb-4 flex justify-end">
      <Button className="text-red-500 cursor-pointer" onClick={onThrowError}>
        {UI_STRINGS.errorButton}
      </Button>
    </footer>
  );
};

import { useState } from 'react';
import { Button } from '@/components/Button';
import { UI_STRINGS } from '@/shared/constants/ui-strings';

export const Footer = () => {
  const [wouldThrow, setWouldThrow] = useState(false);

  if (wouldThrow) {
    throw new Error('test error from button');
  }

  return (
    <footer className="px-4 pb-4 flex justify-end">
      <Button
        className="text-red-500 cursor-pointer"
        onClick={() => setWouldThrow(true)}
      >
        {UI_STRINGS.errorButton}
      </Button>
    </footer>
  );
};

import { useEffect, useState } from 'react';
import { Button } from '@/components/Button';
import { UI_STRINGS } from '@/shared/constants/ui-strings';

export const ErrorBoundaryTesterButton = () => {
  const [triggerTestError, setTriggerTestError] = useState(false);

  useEffect(() => {
    if (triggerTestError) {
      throw new Error('test error from button');
    }
  }, [triggerTestError]);

  return (
    <Button
      className="text-red-500 cursor-pointer"
      onClick={() => setTriggerTestError(true)}
    >
      {UI_STRINGS.errorButton}
    </Button>
  );
};

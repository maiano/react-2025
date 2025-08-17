import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/Button';
import { UI_STRINGS } from '@/shared/constants/ui-strings';

type RefreshButtonProps = {
  queryKey: unknown[];
};

export const RefreshButton = ({ queryKey }: RefreshButtonProps) => {
  const queryClient = useQueryClient();

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey });
  };

  return (
    <Button onClick={handleRefresh} className="text-red-500 cursor-pointer">
      {UI_STRINGS.refreshButton}
    </Button>
  );
};

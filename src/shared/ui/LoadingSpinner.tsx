import spinner from '@/assets/spinner-gap-thin.svg';
import { UI_STRINGS } from '@/shared/constants/ui-strings';

export const LoadingSpinner = () => {
  return (
    <img
      src={spinner}
      className="w-14 h-14 animate-spin"
      alt={UI_STRINGS.altLoading}
    />
  );
};

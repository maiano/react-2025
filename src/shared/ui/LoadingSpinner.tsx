import Image from 'next/image';
import { UI_STRINGS } from '@/shared/constants/ui-strings';

export const LoadingSpinner = () => {
  return (
    <Image
      src="/spinner-gap-thin.svg"
      width={56}
      height={56}
      className="w-14 h-14 animate-spin"
      alt={UI_STRINGS.altLoading}
    />
  );
};

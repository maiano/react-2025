import { ERROR_UI_STRINGS } from '@/shared/constants/errors';

export const NotFoundPage = () => {
  return (
    <p className="text-lg text-red-400 font-mono text-center mt-8">
      {ERROR_UI_STRINGS.unknownError}
    </p>
  );
};

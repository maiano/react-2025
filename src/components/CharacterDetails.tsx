import { useParams, useNavigate, useSearchParams } from 'react-router';
import spinner from '@/assets/spinner-gap-thin.svg';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { LoadingOverlay } from '@/components/LoadingOverlay';
import { useCharacterQuery } from '@/hooks/useCharacterQuery';
import { ERROR_UI_STRINGS } from '@/shared/constants/errors';
import { UI_STRINGS } from '@/shared/constants/ui-strings';

export const CharacterDetails = () => {
  const { characterId } = useParams();
  const {
    data: character,
    isLoading,
    isError,
  } = useCharacterQuery(characterId || '');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleClose = () => {
    navigate(`/?${searchParams.toString()}`);
  };

  if (isError || !character)
    return isLoading
      ? null
      : isError || (
          <p className="text-lg text-red-400 font-mono text-center mt-8">
            {ERROR_UI_STRINGS.unknownError}
          </p>
        );

  return (
    <div className="flex flex-col gap-4 items-center bg-gray-100 w-full mt-8 sm:max-w-sm animate-fadeIn">
      <LoadingOverlay show={isLoading}>
        <img
          src={spinner}
          className="w-14 h-14 animate-spin"
          alt={UI_STRINGS.altLoading}
        />
      </LoadingOverlay>
      <Card character={character} />
      <Button onClick={handleClose} className="w-full">
        Close
      </Button>
    </div>
  );
};

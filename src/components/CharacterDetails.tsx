import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { LoadingOverlay } from '@/components/LoadingOverlay';
import { useCharacterQuery } from '@/hooks/useCharacterQuery';
import { ERROR_UI_STRINGS } from '@/shared/constants/errors';
import { LoadingSpinner } from '@/shared/ui/LoadingSpinner';

type CharacterDetailsProps = {
  characterId: string;
  onClose: () => void;
};

export const CharacterDetails = ({
  characterId,
  onClose,
}: CharacterDetailsProps) => {
  const {
    data: character,
    isLoading,
    isError,
  } = useCharacterQuery(characterId);

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
        <LoadingSpinner />
      </LoadingOverlay>
      <Card variant="details" character={character} />
      <Button onClick={onClose} className="w-full">
        Close
      </Button>
    </div>
  );
};

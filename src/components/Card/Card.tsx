import clsx from 'clsx';
import { CardText } from './CardText';
import { CARD_TEXT } from '@/shared/constants/cards';
import { useSelectedCharactersStore } from '@/store/selectedCharactersStore';
import type { Character } from '@/types/character';

type CardVariant = 'list' | 'details';

type CardProps = {
  character: Character;
  onClick?: (id: number) => void;
  variant: CardVariant;
};

export const Card = ({ character, onClick, variant = 'list' }: CardProps) => {
  const { id, name, status, species, gender, image, origin, location } =
    character;

  const fallbackMap: Record<string, string> = {
    status: CARD_TEXT.fallback.status,
    gender: CARD_TEXT.fallback.gender,
  } as const;

  const getDisplayValue = (key: string, value: string): string => {
    if (value === 'unknown') {
      return fallbackMap[key] ?? CARD_TEXT.fallback.default;
    }
    return value;
  };

  const isClickable = !!onClick;

  const { toggleCharacter, isSelected } = useSelectedCharactersStore();

  const selected = isSelected(id);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!isClickable) return;
    if (e.key === 'Enter' || e.key === ' ') {
      onClick?.(id);
    }
  };

  return (
    <div
      onKeyDown={handleKeyDown}
      onClick={isClickable ? () => onClick?.(id) : undefined}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      className={clsx(
        'flex gap-4 p-4 bg-gray-200 dark:bg-gray-400 transition-all animate-fadeIn',
        {
          'flex-col cursor-pointer md:flex-row items-center max-w-xl relative':
            variant === 'list',
          'flex-col items-center text-center w-full': variant === 'details',
        },
      )}
    >
      {variant === 'list' && (
        <input
          type="checkbox"
          checked={selected}
          onChange={() => toggleCharacter(character)}
          onClick={(e) => e.stopPropagation()}
          aria-label={`select ${name}`}
          className="absolute top-2 right-2 w-4 h-4 accent-gray-200 focus:outline-none focus:ring focus:ring-gray-100 cursor-pointer"
        />
      )}
      <img
        src={image}
        alt={name}
        className={`object-cover ${
          variant === 'details'
            ? 'w-full mx-auto'
            : 'min-w-36 rounded-full transition-transform hover:scale-105'
        }`}
      />
      <div className="flex flex-col gap-2">
        <h3 className="text-2xl font-caveat">{name}</h3>
        <CardText>
          {CARD_TEXT.label.species}: {species}
        </CardText>
        <CardText>
          {CARD_TEXT.label.status}: {getDisplayValue('status', status)}
        </CardText>
        <CardText>
          {CARD_TEXT.label.gender}: {getDisplayValue('gender', gender)}
        </CardText>
        {origin.name !== 'unknown' ? (
          <CardText>
            {CARD_TEXT.label.origin}: {origin.name}
          </CardText>
        ) : (
          <CardText>
            {CARD_TEXT.fallback.originFallback}:{' '}
            {location?.name && location.name !== 'unknown'
              ? location.name
              : CARD_TEXT.fallback.locationUnknown}
          </CardText>
        )}
      </div>
    </div>
  );
};

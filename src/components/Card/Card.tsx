import { CardText } from './CardText';
import { CARD_TEXT } from '@/shared/constants/cards';
import type { Character } from '@/types/character';

type CardProps = {
  character: Character;
  onClick?: (id: number) => void;
  variant?: 'list' | 'details';
};

export const Card = ({ character, onClick, variant = 'list' }: CardProps) => {
  const { id, name, status, species, gender, image, origin, location } =
    character;
  const getValue = (key: string, value: string): string => {
    if (value === 'unknown') {
      switch (key) {
        case 'status':
          return CARD_TEXT.fallback.status;
        case 'gender':
          return CARD_TEXT.fallback.gender;
        default:
          return CARD_TEXT.fallback.default;
      }
    }
    return value;
  };

  const baseClasses =
    'flex gap-4 p-4 bg-gray-200 dark:bg-gray-400 transition-all animate-fadeIn';

  const listLayout =
    'flex-col cursor-pointer md:flex-row items-center max-w-xl';
  const detailsLayout = 'flex-col items-center text-center w-full';

  const isClickable = !!onClick;

  return (
    <div
      onKeyDown={
        isClickable
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onClick?.(id);
              }
            }
          : undefined
      }
      onClick={isClickable ? () => onClick?.(id) : undefined}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      className={`${baseClasses} ${variant === 'list' ? listLayout : detailsLayout}`}
    >
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
          {CARD_TEXT.label.status}: {getValue('status', status)}
        </CardText>
        <CardText>
          {CARD_TEXT.label.gender}: {getValue('gender', gender)}
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

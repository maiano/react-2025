import { Component } from 'react';
import { CardText } from './CardText';
import { CARD_TEXT } from '@/shared/constants/cards';
import type { Character } from '@/types/character';

type CardProps = {
  character: Character;
};

export class Card extends Component<CardProps> {
  getValue(key: string, value: string): string {
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
  }

  render() {
    const { name, status, species, gender, image, origin, location } =
      this.props.character;

    return (
      <div className="flex flex-col md:flex-row items-center gap-4 p-4 bg-gray-200 dark:bg-gray-400 max-w-xl">
        <img
          src={image}
          alt={name}
          className="min-w-36 rounded-full object-cover transition-transform hover:scale-105"
        />
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl font-caveat">{name}</h3>
          <CardText>
            {CARD_TEXT.label.species}: {species}
          </CardText>
          <CardText>
            {CARD_TEXT.label.status}: {this.getValue('status', status)}
          </CardText>
          <CardText>
            {CARD_TEXT.label.gender}: {this.getValue('gender', gender)}
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
  }
}

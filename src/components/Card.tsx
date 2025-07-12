import { Component } from 'react';
import type { Character } from '@/types/character';

type CardProps = {
  character: Character;
};

const CardText = ({ children }: { children: React.ReactNode }) => (
  <p className="italic text-sm text-gray-800 dark:text-gray-50">{children}</p>
);

export class Card extends Component<CardProps> {
  getValue(key: string, value: string): string {
    if (value === 'unknown') {
      switch (key) {
        case 'status':
          return 'Glitchy life status';
        case 'gender':
          return 'Weird identity';
        default:
          return `${key}: Rick broke it!`;
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
          <CardText>Species Code: {species}</CardText>
          <CardText>Live Status: {this.getValue('status', status)}</CardText>
          <CardText>Identity: {this.getValue('gender', gender)}</CardText>
          {origin.name !== 'unknown' ? (
            <CardText>Native Dimension: {origin.name}</CardText>
          ) : (
            <CardText>
              Origin lost, last spotted:{' '}
              {location?.name && location.name !== 'unknown'
                ? location.name
                : 'somewhere in the multiverse'}
            </CardText>
          )}
        </div>
      </div>
    );
  }
}

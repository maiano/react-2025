import { Component } from 'react';
import type { Character } from '@/types/character';

type CardProps = {
  character: Character;
};

export class Card extends Component<CardProps> {
  render() {
    const { name, status, species, gender, image } = this.props.character;

    return (
      <div className="flex items-center gap-4 p-4 dark:bg-gray-400 bg-gray-200">
        <img
          src={image}
          alt={name}
          className="min-w-36 rounded-full object-cover"
        />
        <div>
          <h3 className="text-2xl font-caveat">{name}</h3>
          <p className="italic text-sm text-gray-800 dark:text-gray-200">
            {species} - {status}, {gender}
          </p>
        </div>
      </div>
    );
  }
}

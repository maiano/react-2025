import { Component } from 'react';
import { Card } from './Card';
import type { Character } from '@/types/character';

type CardListProps = {
  items: Character[];
};

export class CardList extends Component<CardListProps> {
  render() {
    const { items } = this.props;

    if (!items.length) {
      return <p className="text-center text-gray-400">No results</p>;
    }

    return (
      <div className="grid gap-4 mt-8 min-sm:grid-cols-2 min-lg:grid-cols-3 min-xl:grid-cols-4">
        {items.map((char) => (
          <Card key={char.id} character={char} />
        ))}
      </div>
    );
  }
}

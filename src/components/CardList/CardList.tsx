import { Card } from '@/components/Card';
import type { Character } from '@/types/character';

type CardListProps = {
  items: Character[];
  className?: string;
  onClick?: (id: number) => void;
};

export const CardList = ({ items, className = '', onClick }: CardListProps) => {
  if (!items.length) {
    return <p className="text-center text-gray-400">No results</p>;
  }

  return (
    <div
      className={`grid gap-4 mt-8 grid-cols-[repeat(auto-fit,minmax(250px,1fr))] animate-fadeIn justify-center ${className}`}
    >
      {items.map((char) => (
        <Card key={char.id} character={char} onClick={onClick} />
      ))}
    </div>
  );
};

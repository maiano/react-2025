import type { FormData } from '@/shared/validation/schema.ts';

export const Tile = ({ data, isNew }: { data: FormData; isNew: boolean }) => {
  return (
    <div
      className={`border p-4 mb-4 ${isNew ? 'animate-pulse border-green-400' : 'border-gray-300'}`}
    >
      <p>
        <strong>Name:</strong> {data.name}
      </p>
      <p>
        <strong>Age:</strong> {data.age}
      </p>
      <p>
        <strong>Email:</strong> {data.email}
      </p>
      <p>
        <strong>Country:</strong> {data.country}
      </p>
      {data.image && <img src={data.image} alt="User" className="h-16 mt-2" />}
    </div>
  );
};

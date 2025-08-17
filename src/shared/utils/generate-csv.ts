'use server';

import type { Character } from '@/types/character';

export const generateCSV = async (characters: Character[]) => {
  const headers = [
    'Name',
    'Status',
    'Species',
    'Gender',
    'Origin',
    'Details URL',
  ];

  const rows = characters.map((char) => [
    char.name,
    char.status,
    char.species,
    char.gender,
    char.origin.name,
    `${process.env.NEXT_PUBLIC_SITE_URL}/character/${char.id}`,
  ]);

  const escapeCsvValue = (value: string) => `"${value.replace(/"/g, '""')}"`;

  const csvContent = [
    headers.map(escapeCsvValue).join(','),
    ...rows.map((row) => row.map(escapeCsvValue).join(',')),
  ].join('\n');

  return {
    csvContent,
    fileName: `${characters.length}_items.csv`,
  };
};

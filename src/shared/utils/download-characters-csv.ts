import type { Character } from '@/types/character';

export const downloadCharactersCSV = (characters: Character[]) => {
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
    `${window.location.origin}/character/${char.id}`,
  ]);

  const escapeCsvValue = (value: string) => `"${value.replace(/"/g, '""')}"`;

  const csvContent = [
    headers.map(escapeCsvValue).join(','),
    ...rows.map((row) => row.map(escapeCsvValue).join(',')),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${characters.length}_items.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

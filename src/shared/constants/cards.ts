export const CARD_TEXT = {
  label: {
    species: 'Species Code',
    status: 'Live Status',
    gender: 'Identity',
    origin: 'Native Dimension',
  },
  fallback: {
    status: 'Glitchy life status',
    gender: 'Weird identity',
    originFallback: 'Origin lost, last spotted',
    locationUnknown: 'somewhere in the multiverse',
    default: (key: string) => `${key}: Rick broke it!`,
  },
} as const;

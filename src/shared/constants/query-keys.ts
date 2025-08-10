export const QUERY_KEYS = {
  characters: (params: { query: string; page: number }) =>
    ['characters', params] as const,
  character: (id: string) => ['character', id] as const,
} as const;

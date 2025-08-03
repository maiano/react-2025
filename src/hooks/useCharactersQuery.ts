import { useQuery } from '@tanstack/react-query';
import { fetchCharacters } from '@/shared/utils/fetch-сharacters';

export const useCharactersQuery = (query: string, page: number) =>
  useQuery({
    queryKey: ['characters', { query, page }],
    queryFn: () => fetchCharacters(query, page),
  });

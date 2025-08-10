import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/shared/constants/query-keys';
import { fetchCharacters } from '@/shared/utils/fetch-сharacters';

export const useCharactersQuery = (query: string, page: number) =>
  useQuery({
    queryKey: QUERY_KEYS.characters({ query, page }),
    queryFn: () => fetchCharacters(query, page),
  });

import { skipToken, useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/shared/constants/query-keys';
import { fetchCharacterById } from '@/shared/utils/fetch-character';

export const useCharacterQuery = (id: string | undefined) => {
  return useQuery({
    queryKey: QUERY_KEYS.character(id ?? ''),
    queryFn: id ? () => fetchCharacterById(id) : skipToken,
    staleTime: 1000 * 60 * 5,
  });
};

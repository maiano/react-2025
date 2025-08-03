import { useQuery } from '@tanstack/react-query';
import { fetchCharacterById } from '@/shared/utils/fetch-character';

export const useCharacterQuery = (id: string) => {
  return useQuery({
    queryKey: ['character', id],
    queryFn: () => fetchCharacterById(id),
    enabled: !!id,
  });
};

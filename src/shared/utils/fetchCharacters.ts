import { BASE_API_URL } from '@/shared/constants/api';
import type { CharacterApiResponse } from '@/types/character';

export async function fetchCharacters(
  name: string,
  page = 1,
): Promise<CharacterApiResponse> {
  const url = `${BASE_API_URL}/character/?page=${page}&name=${name}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Seriously? 404, multiverse not found!');
  }

  return (await response.json()) as CharacterApiResponse;
}

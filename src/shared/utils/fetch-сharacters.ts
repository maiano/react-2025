import { BASE_API_URL } from '@/shared/constants/api';
import { ERROR_UI_STRINGS } from '@/shared/constants/errors';
import type { CharacterApiResponse } from '@/types/character';

export async function fetchCharacters(
  name: string,
  page = 1,
): Promise<CharacterApiResponse> {
  const url = `${BASE_API_URL}/character/?page=${page}&name=${name}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(ERROR_UI_STRINGS.notFound);
  }

  return (await response.json()) as CharacterApiResponse;
}

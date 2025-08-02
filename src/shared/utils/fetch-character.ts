import { BASE_API_URL } from '@/shared/constants/api';
import { ERROR_UI_STRINGS } from '@/shared/constants/errors';
import type { Character } from '@/types/character';

export const fetchCharacterById = async (id: string): Promise<Character> => {
  const url = `${BASE_API_URL}/character/${id}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(ERROR_UI_STRINGS.unknownError);
  return (await response.json()) as Character;
};

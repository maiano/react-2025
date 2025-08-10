type ApiInfo = {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
};

type CharacterStatus = 'Alive' | 'Dead' | 'unknown';
type CharacterGender = 'Female' | 'Male' | 'Genderless' | 'unknown';

type Character = {
  id: number;
  name: string;
  status: CharacterStatus;
  species: string;
  type: string;
  gender: CharacterGender;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
};

type CharacterApiResponse = {
  info: ApiInfo;
  results: Character[];
};

export type { ApiInfo, Character, CharacterApiResponse };

type ApiInfo = {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
};

type Character = {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  type: string;
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
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

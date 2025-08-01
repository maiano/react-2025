import { fetchCharacters } from '@/shared/utils/fetch-сharacters';
import { searchStorage } from '@/shared/utils/local-storage';

export const homePageLoader = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get('page') || 1);
  const searchQuery = url.searchParams.get('name') || searchStorage.get();

  const data = await fetchCharacters(searchQuery, page);
  return { data, page, searchQuery };
};

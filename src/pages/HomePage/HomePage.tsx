import { useState } from 'react';
import { useLoaderData } from 'react-router';
import spinner from '@/assets/spinner-gap-thin.svg';
import { CardList } from '@/components/CardList';
import { LoadingOverlay } from '@/components/LoadingOverlay';
import { Pagination } from '@/components/Pagination';
import { SearchBar } from '@/components/SearchBar';
import { useSearchQuery } from '@/hooks/useSearchQuery';
import { ERROR_UI_STRINGS } from '@/shared/constants/errors';
import { UI_STRINGS } from '@/shared/constants/ui-strings';
import { fetchCharacters } from '@/shared/utils/fetch-сharacters';
import { searchStorage } from '@/shared/utils/local-storage';
import type { ApiInfo, Character } from '@/types/character';

type LoaderData = {
  data: { results: Character[]; info: ApiInfo };
  page: number;
  searchQuery: string;
};

export const HomePage = () => {
  const {
    data,
    page: initialPage,
    searchQuery: initialQuery,
  } = useLoaderData() as LoaderData;
  const { set } = useSearchQuery();

  const [characters, setCharacters] = useState(data.results);
  const [info, setInfo] = useState(data.info);
  const [page, setPage] = useState(initialPage);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSearch = async (text: string) => {
    set(text);
    try {
      setIsLoading(true);
      const data = await fetchCharacters(text);
      setCharacters(data.results);
      setInfo(data.info);
      setPage(1);
      setHasError(false);
      setErrorMessage(null);
    } catch (err) {
      setHasError(true);
      setErrorMessage((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = async (nextPage: number) => {
    try {
      setIsLoading(true);
      const data = await fetchCharacters(searchStorage.get(), nextPage);
      setCharacters(data.results);
      setInfo(data.info);
      setPage(nextPage);
    } catch (err) {
      setHasError(true);
      setErrorMessage((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex-grow py-8 px-2 min-sm:px-4">
      <LoadingOverlay show={isLoading}>
        <img
          src={spinner}
          className="w-14 h-14 animate-spin"
          alt={UI_STRINGS.altLoading}
        />
      </LoadingOverlay>
      <SearchBar
        searchQuery={initialQuery}
        onSearch={handleSearch}
        isLoading={isLoading}
      />
      {isLoading ? null : hasError ? (
        <p className="text-lg text-red-400 font-mono text-center mt-8">
          {errorMessage ?? ERROR_UI_STRINGS.unknownError}
        </p>
      ) : characters.length === 0 ? (
        <p className="text-lg text-red-300 font-mono text-center mt-8">
          {ERROR_UI_STRINGS.notFound}
        </p>
      ) : (
        <CardList items={characters} />
      )}
      {!isLoading && !hasError && (
        <Pagination
          className="mt-8 flex-wrap"
          total={info?.pages}
          value={page}
          onChange={handlePageChange}
        />
      )}
    </main>
  );
};

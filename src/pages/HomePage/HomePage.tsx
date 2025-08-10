import { useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router';
import { CardList } from '@/components/CardList';
import { CharacterDetails } from '@/components/CharacterDetails';
import { Flyout } from '@/components/Flyout';
import { LoadingOverlay } from '@/components/LoadingOverlay';
import { Pagination } from '@/components/Pagination';
import { SearchBar } from '@/components/SearchBar';
import { useCharactersQuery } from '@/hooks/useCharactersQuery';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { ERROR_UI_STRINGS } from '@/shared/constants/errors';
import { LoadingSpinner } from '@/shared/ui/LoadingSpinner';
import { searchStorage } from '@/shared/utils/local-storage';

export const HomePage = () => {
  const navigate = useNavigate();
  const { characterId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [storedSearchQuery, setStoredSearchQuery] = useLocalStorage(
    searchStorage.key,
    '',
  );

  const searchQueryFromURL = searchParams.get('name') ?? '';
  const pageFromURL = Number(searchParams.get('page') ?? 1);

  const { data, isLoading, isError, error } = useCharactersQuery(
    searchQueryFromURL,
    pageFromURL,
  );

  useEffect(() => {
    if (!searchQueryFromURL && storedSearchQuery) {
      setSearchParams({ name: storedSearchQuery, page: '1' });
    }
  }, [searchQueryFromURL, storedSearchQuery, setSearchParams]);

  useEffect(() => {
    if (!characterId || !data?.results?.length) return;
    const isEqual = data.results.some(
      (char) => String(char.id) === characterId,
    );

    if (!isEqual) {
      navigate(`/?name=${searchQueryFromURL}&page=${pageFromURL}`, {
        replace: true,
      });
    }
  }, [characterId, data?.results, navigate, searchQueryFromURL, pageFromURL]);

  const handleSearch = (text: string) => {
    setStoredSearchQuery(text);
    setSearchParams({ name: text, page: '1' });
  };

  const handlePageChange = (nextPage: number) => {
    setSearchParams({ name: searchQueryFromURL, page: String(nextPage) });
  };

  return (
    <>
      <main className="flex-grow py-8 px-2 min-sm:px-4">
        <LoadingOverlay show={isLoading}>
          <LoadingSpinner />
        </LoadingOverlay>
        <SearchBar
          searchQuery={searchQueryFromURL}
          onSearch={handleSearch}
          isLoading={isLoading}
        />
        {isLoading ? null : isError ? (
          <p className="text-lg text-red-400 font-mono text-center mt-8">
            {(error as Error)?.message || ERROR_UI_STRINGS.unknownError}
          </p>
        ) : data?.results?.length === 0 ? (
          <p className="text-lg text-red-300 font-mono text-center mt-8">
            {ERROR_UI_STRINGS.notFound}
          </p>
        ) : (
          <div className="relative flex gap-4 mt-8 flex-wrap sm:flex-nowrap">
            <div className="flex-1">
              <CardList
                items={data?.results || []}
                onClick={(id) =>
                  navigate(`/character/${id}?${searchParams.toString()}`)
                }
              />
              {!isLoading && !isError && (
                <Pagination
                  className="mt-8 flex-wrap"
                  total={data?.info.pages || 1}
                  currentPage={pageFromURL}
                  onChange={handlePageChange}
                />
              )}
            </div>
            {characterId && (
              <div className="hidden sm:block sm:w-[320px]">
                <CharacterDetails
                  characterId={characterId}
                  onClose={() =>
                    navigate(`/character?${searchParams.toString()}`)
                  }
                />
              </div>
            )}
          </div>
        )}
        {characterId && (
          <div className="sm:hidden fixed inset-0 z-100 bg-white overflow-y-auto">
            <CharacterDetails
              characterId={characterId}
              onClose={() => navigate(`/character?${searchParams.toString()}`)}
            />
          </div>
        )}
      </main>
      <Flyout />
    </>
  );
};

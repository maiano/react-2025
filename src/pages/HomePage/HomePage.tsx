import { type ReactNode, Component } from 'react';
import spinner from '@/assets/spinner-gap-thin.svg';
import { CardList } from '@/components/CardList';
import { LoadingOverlay } from '@/components/LoadingOverlay';
import { Pagination } from '@/components/Pagination';
import { SearchBar } from '@/components/SearchBar';
import { ERROR_UI_STRINGS } from '@/shared/constants/errors';
import { UI_STRINGS } from '@/shared/constants/ui-strings';
import { fetchCharacters } from '@/shared/utils/fetch-сharacters';
import { searchStorage } from '@/shared/utils/local-storage';
import type { ApiInfo, Character } from '@/types/character';

type State = {
  info: ApiInfo | null;
  characters: Character[];
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string | null;
  page: number;
  searchQuery: string;
};

export class HomePage extends Component<unknown, State> {
  state: State = {
    info: null,
    characters: [],
    isLoading: false,
    hasError: false,
    errorMessage: null,
    page: 1,
    searchQuery: searchStorage.get(),
  };

  componentDidMount(): void {
    this.fetchCharacters(this.state.searchQuery);
  }

  fetchCharacters = async (search: string, page = 1) => {
    this.setState({ isLoading: true, hasError: false, errorMessage: null });

    try {
      const data = await fetchCharacters(search, page);

      this.setState({
        info: data.info,
        characters: data.results,
        page,
      });
    } catch (error) {
      this.setState({
        hasError: true,
        errorMessage: (error as Error).message,
        characters: [],
      });
    } finally {
      setTimeout(() => {
        this.setState({ isLoading: false });
      }, 200);
    }
  };

  handleSearch = (text: string) => {
    searchStorage.set(text);
    this.fetchCharacters(text);
  };

  handlePageChange = (page: number) =>
    this.fetchCharacters(searchStorage.get(), page);

  render(): ReactNode {
    const {
      characters,
      isLoading,
      hasError,
      errorMessage,
      page,
      info,
      searchQuery,
    } = this.state;

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
          searchQuery={searchQuery}
          onSearch={this.handleSearch}
          isLoading={isLoading}
        />
        {isLoading ? null : hasError ? (
          <p className="text-lg text-red-400 font-mono text-center mt-8">
            {errorMessage ?? ERROR_UI_STRINGS.unknownError}
          </p>
        ) : (
          <CardList items={characters} />
        )}
        {!isLoading && !hasError && (
          <Pagination
            className="mt-8 flex-wrap"
            total={info?.pages}
            value={page}
            onChange={this.handlePageChange}
          />
        )}
      </main>
    );
  }
}

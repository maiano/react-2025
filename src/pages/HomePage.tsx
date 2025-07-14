import { type ReactNode, Component } from 'react';
import spinner from '@/assets/spinner-gap-thin.svg';
import { CardList } from '@/components/CardList';
import { LoadingOverlay } from '@/components/LoadingOverlay';
import { Pagination } from '@/components/Pagination';
import { SearchBar } from '@/components/SearchBar';
import { fetchCharacters } from '@/shared/utils/fetch-сharacters';
import { searchStorage } from '@/shared/utils/local-storage';
import type { ApiInfo, Character } from '@/types/character';

type State = {
  info: ApiInfo | null;
  characters: Character[];
  loading: boolean;
  error: string | null;
  page: number;
  term: string;
};

class HomePage extends Component<unknown, State> {
  state: State = {
    info: null,
    characters: [],
    loading: false,
    error: null,
    page: 1,
    term: searchStorage.get(),
  };

  componentDidMount(): void {
    this.fetchCharacters(this.state.term);
  }

  fetchCharacters = async (search: string, page = 1) => {
    try {
      this.setState({ loading: true, error: null });

      const data = await fetchCharacters(search, page);

      this.setState({
        info: data.info,
        characters: data.results,
        page,
      });
    } catch (error) {
      this.setState({
        error: (error as Error).message,
        characters: [],
      });
    } finally {
      setTimeout(() => {
        this.setState({ loading: false });
      }, 200);
    }
  };

  handleSearch = (text: string) => {
    this.fetchCharacters(text);
  };

  handlePageChange = (page: number) =>
    this.fetchCharacters(searchStorage.get(), page);

  render(): ReactNode {
    const { characters, loading, error, page, info, term } = this.state;

    return (
      <main className="flex-grow py-8 px-2 min-sm:px-4">
        <LoadingOverlay show={loading}>
          <img src={spinner} className="w-14 h-14 animate-spin" alt="Loading" />
        </LoadingOverlay>
        <SearchBar term={term} onSearch={this.handleSearch} loading={loading} />
        {loading || error ? (
          <p className="text-lg text-red-400 font-mono text-center mt-8">
            {error}
          </p>
        ) : (
          <CardList items={characters} />
        )}
        {!loading && !error && (
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

export default HomePage;

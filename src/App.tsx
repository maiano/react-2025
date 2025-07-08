import { Component, type ReactNode } from 'react';
import spinner from '@/assets/spinner-gap-thin.svg';
import { Button } from '@/components/Button';
import { CardList } from '@/components/CardList';
import Header from '@/components/Header';
import { LoadingOverlay } from '@/components/LoadingOverlay';
import { Pagination } from '@/components/Pagination';
import SearchBar from '@/components/SearchBar';
import type {
  ApiInfo,
  Character,
  CharacterApiResponse,
} from '@/types/character';

type AppState = {
  info: ApiInfo | null;
  characters: Character[];
  loading: boolean;
  error: string | null;
  wouldThrow: boolean;
  page: number;
};

class App extends Component {
  state: AppState = {
    info: null,
    characters: [],
    loading: false,
    error: null,
    wouldThrow: false,
    page: 1,
  };

  componentDidMount(): void {
    const savedSearch = localStorage.getItem('rick-and-morty-search') || '';
    this.fetchCharacters(savedSearch);
  }

  fetchCharacters = async (search: string, page = 1) => {
    try {
      this.setState({ loading: true, error: null });

      const res = await fetch(
        `https://rickandmortyapi.com/api/character/?page=${page}&name=${search}`,
      );

      if (!res.ok) {
        throw new Error('Not found');
      }

      const data = (await res.json()) as CharacterApiResponse;

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

  render(): ReactNode {
    const { characters, loading, error, wouldThrow } = this.state;

    if (wouldThrow) {
      throw new Error('test error from button');
    }

    return (
      <div className="flex min-h-screen bg-white">
        <div className="w-full max-w-7xl flex flex-col bg-gray-100 mx-auto flex-grow">
          <Header />
          <LoadingOverlay show={loading}>
            <img
              src={spinner}
              className="w-14 h-14 animate-spin"
              alt="Loading"
            />
          </LoadingOverlay>
          <main className="flex-grow py-8 px-2 min-sm:px-4">
            <div className="flex justify-center">
              <SearchBar onSearch={this.handleSearch} loading={loading} />
            </div>
            {loading || error ? (
              <p className="text-center mt-4">{error}</p>
            ) : (
              <CardList items={characters} />
            )}
            {!loading && !error && characters.length > 0 && (
              <Pagination
                className="mt-8 flex-wrap"
                total={this.state.info?.pages}
                value={this.state.page}
                onChange={(page) => {
                  const savedSearch =
                    localStorage.getItem('rick-and-morty-search') || '';
                  this.fetchCharacters(savedSearch, page);
                }}
              />
            )}

            {!loading && (
              <div className="mt-8 flex justify-end">
                <Button
                  className="text-red-500 cursor-pointer"
                  onClick={() => this.setState({ wouldThrow: true })}
                >
                  Throw Error
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    );
  }
}

export default App;

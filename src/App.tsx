import { Component, type ReactNode } from 'react';
import { Button } from '@/components/Button';
import { CardList } from '@/components/CardList';
import Header from '@/components/Header';
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
};

class App extends Component {
  state: AppState = {
    info: null,
    characters: [],
    loading: false,
    error: null,
    wouldThrow: false,
  };

  componentDidMount(): void {
    const savedSearch = localStorage.getItem('rick-and-morty-search') || '';
    this.fetchCharacters(savedSearch);
  }

  fetchCharacters = async (search: string) => {
    try {
      this.setState({ loading: true, error: null });

      const res = await fetch(
        `https://rickandmortyapi.com/api/character/?name=${search}`,
      );

      if (!res.ok) {
        throw new Error('Not found');
      }

      const data = (await res.json()) as CharacterApiResponse;

      this.setState({
        info: data.info,
        characters: data.results,
      });
    } catch (error) {
      this.setState({
        error: (error as Error).message,
        characters: [],
      });
    } finally {
      this.setState({ loading: false });
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
          <main className="flex-grow py-8 px-2 min-sm:px-4">
            <div className="flex justify-center">
              <SearchBar onSearch={this.handleSearch} />
            </div>
            {loading && <p className="text-center mt-4">Loading...</p>}
            {loading || error ? (
              <p className="text-center mt-4">{error}</p>
            ) : (
              <CardList items={characters} />
            )}
            <div className="mt-8 flex justify-end">
              <Button
                className="text-red-500"
                onClick={() => this.setState({ wouldThrow: true })}
              >
                Throw Error
              </Button>
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default App;

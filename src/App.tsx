import { Component, type ReactNode } from 'react';
import spinner from '@/assets/spinner-gap-thin.svg';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { LoadingOverlay } from '@/components/LoadingOverlay';
import HomePage from '@/pages/HomePage';
import { fetchCharacters } from '@/shared/utils/fetchCharacters';
import { searchStorage } from '@/shared/utils/local-storage';
import type { ApiInfo, Character } from '@/types/character';

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
    this.fetchCharacters(searchStorage.get());
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
    const { characters, loading, error, wouldThrow } = this.state;

    if (wouldThrow) {
      throw new Error('test error from button');
    }

    return (
      <div className="flex min-h-screen bg-white">
        <div className="w-full max-w-7xl flex flex-col bg-gray-100 mx-auto">
          <Header />
          <LoadingOverlay show={loading}>
            <img
              src={spinner}
              className="w-14 h-14 animate-spin"
              alt="Loading"
            />
          </LoadingOverlay>
          <HomePage
            characters={characters}
            loading={loading}
            error={error}
            page={this.state.page}
            info={this.state.info}
            onSearch={this.handleSearch}
            onPageChange={this.handlePageChange}
          />
          <Footer onThrowError={() => this.setState({ wouldThrow: true })} />
        </div>
      </div>
    );
  }
}

export default App;

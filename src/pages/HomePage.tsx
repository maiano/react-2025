import { type ReactNode, Component } from 'react';
import { CardList } from '@/components/CardList';
import { Pagination } from '@/components/Pagination';
import SearchBar from '@/components/SearchBar';
import type { ApiInfo, Character } from '@/types/character';

type Props = {
  characters: Character[];
  loading: boolean;
  error: string | null;
  page: number;
  info: ApiInfo | null;
  onSearch: (text: string) => void;
  onPageChange: (page: number) => void;
};

class HomePage extends Component<Props> {
  render(): ReactNode {
    const { characters, loading, error, page, info, onSearch, onPageChange } =
      this.props;

    return (
      <main className="flex-grow py-8 px-2 min-sm:px-4">
        <div className="flex justify-center">
          <SearchBar onSearch={onSearch} loading={loading} />
        </div>
        {loading || error ? (
          <p className="text-center mt-4">{error}</p>
        ) : (
          <CardList items={characters} />
        )}
        {!loading && !error && (
          <Pagination
            className="mt-8 flex-wrap"
            total={info?.pages}
            value={page}
            onChange={onPageChange}
          />
        )}
      </main>
    );
  }
}

export default HomePage;

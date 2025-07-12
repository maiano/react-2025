import { Component, type ReactNode } from 'react';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { debug } from '@/shared/utils/debug-log';
import { searchStorage } from '@/shared/utils/local-storage';

type Props = {
  onSearch: (text: string) => void;
  loading?: boolean;
};

type State = {
  searchText: string;
};

class SearchBar extends Component<Props, State> {
  state: State = {
    searchText: searchStorage.get(),
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchText: e.target.value });
  };

  handleSearch = () => {
    const text = this.state.searchText.trim();
    searchStorage.set(text);
    debug('search string:', text);
    this.props.onSearch(text);
    this.setState({ searchText: text });
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.handleSearch();
  };

  render(): ReactNode {
    const { loading } = this.props;

    return (
      <form
        onSubmit={this.handleSubmit}
        className="flex gap-4 w-full min-sm:w-3/4 min-md:w-2/3 min-lg:w-1/2"
      >
        <Input
          value={this.state.searchText}
          onChange={this.handleInputChange}
          type="text"
          placeholder={'Input text...'}
          disabled={loading}
        />
        <Button type="submit" className="cursor-pointer" disabled={loading}>
          Search
        </Button>
      </form>
    );
  }
}

export default SearchBar;

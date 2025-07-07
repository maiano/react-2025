import { Component, type ReactNode } from 'react';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { debug } from '@/shared/utils/debug-log';

type Props = {
  onSearch: (text: string) => void;
};

class SearchBar extends Component<Props> {
  state = {
    searchText: localStorage.getItem('rick-and-morty-search') || '',
    error: false,
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchText: e.target.value, error: false });
  };

  handleSearch = () => {
    const text = this.state.searchText.trim();
    if (!text) {
      this.setState({ error: true, searchText: '' });
      return;
    }
    localStorage.setItem('rick-and-morty-search', text);
    debug('search string:', text);
    this.props.onSearch(text);
    this.setState({ searchText: '', error: false });
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.handleSearch();
  };

  render(): ReactNode {
    return (
      <form
        onSubmit={this.handleSubmit}
        className="flex gap-4 w-full min-sm:w-3/4 min-md:w-2/3 min-lg:w-1/2"
      >
        <Input
          className={this.state.error ? 'text-red-500' : ''}
          value={this.state.searchText}
          onChange={this.handleInputChange}
          type="text"
          placeholder={
            this.state.error ? 'Search field cannot be empty' : 'Input text...'
          }
          aria-invalid={this.state.error}
        />
        <Button type="submit">Search</Button>
      </form>
    );
  }
}

export default SearchBar;

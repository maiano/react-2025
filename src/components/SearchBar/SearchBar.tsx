import { Component, type ReactNode } from 'react';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { UI_STRINGS } from '@/shared/constants/ui-strings';
import { debug } from '@/shared/utils/debug-log';
import { searchStorage } from '@/shared/utils/local-storage';

type Props = {
  onSearch: (text: string) => void;
  loading?: boolean;
  term: string;
};

type State = {
  searchText: string;
};

export class SearchBar extends Component<Props, State> {
  state: State = {
    searchText: this.props.term,
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
      <div className="flex justify-center">
        <form
          onSubmit={this.handleSubmit}
          className="flex gap-4 w-full min-[448px]:w-11/12 min-[512px]:w-5/6 min-sm:w-4/5 min-md:w-2/3 min-lg:w-1/2"
        >
          <Input
            name="search"
            id="search"
            autoFocus
            value={this.state.searchText}
            onChange={this.handleInputChange}
            type="text"
            placeholder={UI_STRINGS.searchPlaceholder}
            disabled={loading}
          />
          <Button
            type="submit"
            className="cursor-pointer text-nowrap"
            disabled={loading}
          >
            {UI_STRINGS.searchButton}
          </Button>
        </form>
      </div>
    );
  }
}

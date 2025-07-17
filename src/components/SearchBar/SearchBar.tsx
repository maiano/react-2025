import { Component, type ReactNode } from 'react';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { UI_STRINGS } from '@/shared/constants/ui-strings';

type Props = {
  onSearch: (text: string) => void;
  isLoading?: boolean;
  searchQuery: string;
};

type State = {
  inputValue: string;
};

export class SearchBar extends Component<Props, State> {
  state: State = {
    inputValue: this.props.searchQuery,
  };

  componentDidUpdate(prevProps: Props) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.setState({ inputValue: this.props.searchQuery });
    }
  }

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: e.target.value });
  };

  handleSearch = () => {
    const text = this.state.inputValue.trim();
    this.props.onSearch(text);
    this.setState({ inputValue: text });
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.handleSearch();
  };

  render(): ReactNode {
    const { isLoading } = this.props;

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
            value={this.state.inputValue}
            onChange={this.handleInputChange}
            type="text"
            placeholder={UI_STRINGS.searchPlaceholder}
            disabled={isLoading}
          />
          <Button
            type="submit"
            className="cursor-pointer text-nowrap"
            disabled={isLoading}
          >
            {UI_STRINGS.searchButton}
          </Button>
        </form>
      </div>
    );
  }
}

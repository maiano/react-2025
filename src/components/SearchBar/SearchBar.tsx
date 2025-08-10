import { useEffect, useState } from 'react';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { UI_STRINGS } from '@/shared/constants/ui-strings';

type Props = {
  onSearch: (text: string) => void;
  isLoading?: boolean;
  searchQuery: string;
};

export const SearchBar = ({ onSearch, isLoading, searchQuery }: Props) => {
  const [inputValue, setInputValue] = useState(searchQuery);

  useEffect(() => {
    setInputValue(searchQuery);
  }, [searchQuery]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    const text = inputValue.trim();
    setInputValue(text);
    onSearch(text);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex gap-4 w-full min-[448px]:w-11/12 min-[512px]:w-5/6 min-sm:w-4/5 min-md:w-2/3 min-lg:w-1/2"
      >
        <Input
          name="search"
          id="search"
          autoFocus
          value={inputValue}
          onChange={handleInputChange}
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
};

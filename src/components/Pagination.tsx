import LeftIcon from '@/assets/chevron-left.svg?react';
import RightIcon from '@/assets/chevron-right.svg?react';
import { Button } from '@/components/Button';

type PaginationProps = {
  total?: number;
  value: number;
  onChange: (page: number) => void;
  className?: string;
};

const MAX_PAGES = 7;

export const Pagination = ({
  total = 0,
  value,
  onChange,
  className = '',
}: PaginationProps) => {
  const handleClick = (page: number) => {
    if (page !== value) {
      onChange(page);
    }
  };

  if (total < 1) return null;

  const pageButtons = [];

  const isShowAllPages = total <= MAX_PAGES;

  if (isShowAllPages) {
    for (let i = 1; i <= total; i++) {
      pageButtons.push(
        <Button
          key={i}
          onClick={() => handleClick(i)}
          variant={'secondary'}
          className="mx-1 cursor-pointer"
          size={'sm'}
          disabled={i === value}
        >
          {i}
        </Button>,
      );
    }
  }

  return (
    <div className={`flex items-center justify-center mt-4 ${className}`}>
      <Button
        onClick={() => handleClick(value - 1)}
        disabled={value === 1}
        className="mx-2 cursor-pointer"
      >
        <LeftIcon className="text-gray-800" />
      </Button>

      {isShowAllPages ? (
        pageButtons
      ) : (
        <span className="mx-2 text-sm text-gray-700">
          Dimension {value} of {total}
        </span>
      )}

      <Button
        onClick={() => handleClick(value + 1)}
        disabled={value === total}
        className="mx-2 cursor-pointer"
      >
        <RightIcon className="text-gray-800" />
      </Button>
    </div>
  );
};

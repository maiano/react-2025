import Image from 'next/image';
import { Button } from '@/components/Button';

type PaginationProps = {
  total?: number;
  currentPage: number;
  onChange: (page: number) => void;
  className?: string;
};

const MAX_PAGES = 7;

export const Pagination = ({
  total = 0,
  currentPage,
  onChange,
  className = '',
}: PaginationProps) => {
  const handleClick = (page: number) => {
    if (page !== currentPage) {
      onChange(page);
    }
  };

  const isShowAllPages = total <= MAX_PAGES;

  if (total < 1) return null;

  const pageButtons = [];

  if (isShowAllPages) {
    for (let i = 1; i <= total; i++) {
      pageButtons.push(
        <Button
          key={i}
          onClick={() => handleClick(i)}
          variant={'secondary'}
          className="mx-1 cursor-pointer"
          size={'sm'}
          disabled={i === currentPage}
        >
          {i}
        </Button>,
      );
    }
  }

  const onPrev = () => handleClick(currentPage - 1);
  const onNext = () => handleClick(currentPage + 1);

  return (
    <div className={`flex items-center justify-center mt-4 ${className}`}>
      <Button
        onClick={onPrev}
        disabled={currentPage === 1}
        className="mx-2 cursor-pointer"
      >
        <Image src="/chevron-left.svg" alt="Left" width={16} height={16} />
        {/* <LeftIcon className="text-gray-800" /> */}
      </Button>

      {isShowAllPages ? (
        pageButtons
      ) : (
        <span className="mx-2 text-sm text-gray-700">
          Dimension {currentPage} of {total}
        </span>
      )}

      <Button
        onClick={onNext}
        disabled={currentPage === total}
        className="mx-2 cursor-pointer"
      >
        {/* <RightIcon className="text-gray-800" /> */}
        <Image src="/chevron-right.svg" alt="Right" width={16} height={16} />
      </Button>
    </div>
  );
};

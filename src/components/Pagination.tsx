import { Component } from 'react';
import LeftIcon from '@/assets/chevron-left.svg?react';
import RightIcon from '@/assets/chevron-right.svg?react';
import { Button } from '@/components/Button';

type PaginationProps = {
  total?: number;
  value: number;
  onChange: (page: number) => void;
  className?: string;
};

export class Pagination extends Component<PaginationProps> {
  handleClick = (page: number) => {
    const { onChange } = this.props;
    if (page !== this.props.value) {
      onChange(page);
    }
  };

  render() {
    const { total = 0, value, className = '' } = this.props;

    if (total < 1) return null;

    const pageButtons = [];

    for (let i = 1; i <= total; i++) {
      pageButtons.push(
        <Button
          key={i}
          onClick={() => this.handleClick(i)}
          variant={'secondary'}
          className="mx-1 cursor-pointer"
          size={'sm'}
          disabled={i === value}
        >
          {i}
        </Button>,
      );
    }

    return (
      <div className={`flex items-center justify-center mt-4 ${className}`}>
        <Button
          onClick={() => this.handleClick(value - 1)}
          disabled={value === 1}
          className="mx-2 cursor-pointer"
        >
          <LeftIcon className="text-gray-800" />
        </Button>

        {pageButtons}

        <Button
          onClick={() => this.handleClick(value + 1)}
          disabled={value === total}
          className="mx-2 cursor-pointer"
        >
          <RightIcon className="text-gray-800" />
        </Button>
      </div>
    );
  }
}

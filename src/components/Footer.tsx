import { Component, type ReactNode } from 'react';
import { Button } from '@/components/Button';

type FooterProps = {
  onThrowError: () => void;
};

class Footer extends Component<FooterProps> {
  render(): ReactNode {
    return (
      <footer className="px-4 pb-4 flex justify-end">
        <Button
          className="text-red-500 cursor-pointer"
          onClick={this.props.onThrowError}
        >
          Throw Error
        </Button>
      </footer>
    );
  }
}

export default Footer;

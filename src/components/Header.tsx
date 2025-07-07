import { Component, type ReactNode } from 'react';

class Header extends Component {
  render(): ReactNode {
    return (
      <header className="py-8 bg-gray-200 sticky top-0 z-99">
        <h1 className="text-5xl font-caveat text-black text-center">
          Rick and Morty
        </h1>
      </header>
    );
  }
}

export default Header;

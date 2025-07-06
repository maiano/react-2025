import { Component, type ReactNode } from 'react';

class Header extends Component {
  render(): ReactNode {
    return (
      <header className="py-4 bg-gray-200">
        <h1 className="text-5xl font-caveat text-black text-center">
          Rick and Morty
        </h1>
      </header>
    );
  }
}

export default Header;

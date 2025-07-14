import { Component, type ReactNode } from 'react';
import logo from '@/assets/rick-and-morty-sticker-b-w.webp';
import { UI_STRINGS } from '@/shared/constants/ui-strings';

class Header extends Component {
  render(): ReactNode {
    return (
      <header className="flex items-center justify-center gap-8 py-8 bg-gray-200 sticky top-0 z-99 px-4">
        <img src={logo} alt="Logo" className="w-20 rounded-full" />
        <h1 className="text-5xl font-caveat text-black text-center">
          {UI_STRINGS.title}
        </h1>
      </header>
    );
  }
}

export default Header;

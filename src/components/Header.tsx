import Image from 'next/image';
import { Link } from 'react-router';
import { PATHS } from '@/app/paths';
import logo from '@/assets/rick-and-morty-sticker-b-w.webp';
import { ThemeSwitcher } from '@/components/ThemeSwither';
import { UI_STRINGS } from '@/shared/constants/ui-strings';

export const Header = () => {
  return (
    <header className="flex items-center justify-between gap-8 py-8 bg-gray-200 sticky top-0 z-99 px-8">
      <Link to={PATHS.HOME} className="flex items-center gap-4">
        <Image
          src={logo}
          alt="Logo"
          width={80}
          height={80}
          className="w-20 rounded-full"
          priority
        />

        <h1 className="text-5xl font-caveat text-black text-center">
          {UI_STRINGS.title}
        </h1>
      </Link>
      <div className="flex items-center justify-between gap-8">
        <nav className="text-black text-xl font-caveat space-x-6">
          <Link to={PATHS.HOME}>{UI_STRINGS.home}</Link>
          <Link to={PATHS.ABOUT}>{UI_STRINGS.about}</Link>
        </nav>
        <ThemeSwitcher />
      </div>
    </header>
  );
};

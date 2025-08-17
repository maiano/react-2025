'use client';

import Image from 'next/image';
import { Button } from '@/components/Button';
import { useTheme } from '@/context/useTheme';

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      onClick={toggleTheme}
      aria-label="toggle theme"
      className="cursor-pointer"
    >
      <Image
        src={theme === 'light' ? '/moon-com.svg' : '/sun-com.svg'}
        width={20}
        height={20}
        alt="theme switch icon"
      />
    </Button>
  );
};

'use client';

import Image from 'next/image';
import sunIcon from '@/assets//sun-com.svg';
import moonIcon from '@/assets/moon-com.svg';
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
        src={theme === 'light' ? moonIcon : sunIcon}
        width={20}
        height={20}
        alt="theme switch icon"
      />
    </Button>
  );
};

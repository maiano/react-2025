import SunIcon from '@/assets//sun-com.svg?react';
import MoonIcon from '@/assets/moon-com.svg?react';
import { Button } from '@/components/Button';
import { useTheme } from '@/context/useTheme';

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button onClick={toggleTheme} aria-label="toggle theme">
      {theme === 'light' ? (
        <MoonIcon width={20} height={20} />
      ) : (
        <SunIcon width={20} height={20} />
      )}
    </Button>
  );
};

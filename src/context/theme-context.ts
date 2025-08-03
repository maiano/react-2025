import { createContext } from 'react';
import type { ThemeContextType } from '@/context/types';

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

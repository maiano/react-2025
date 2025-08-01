import { useCallback, useState } from 'react';

export function useLocalStorage<T>(key: string, defaultValue: T) {
  const get = (): T => {
    try {
      const item = localStorage.getItem(key);
      if (item === null) return defaultValue;

      if (typeof defaultValue === 'string') {
        return item as T;
      }
      return JSON.parse(item) as T;
    } catch {
      return defaultValue;
    }
  };

  const [value, setValue] = useState<T>(get);

  const set = useCallback(
    (value: T) => {
      try {
        if (typeof value === 'string') {
          localStorage.setItem(key, value);
        } else {
          localStorage.setItem(key, JSON.stringify(value));
        }
        setValue(value);
      } catch {}
    },
    [key],
  );

  return [value, set] as const;
}

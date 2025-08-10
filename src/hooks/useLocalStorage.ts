import { useCallback, useState } from 'react';

export function useLocalStorage<T>(key: string, defaultValue: T) {
  const get = (): T => {
    try {
      const item = localStorage.getItem(key);
      return item !== null ? (JSON.parse(item) as T) : defaultValue;
    } catch {
      return defaultValue;
    }
  };

  const [value, setValue] = useState<T>(() => get());

  const set = useCallback(
    (value: T) => {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        setValue(value);
      } catch {}
    },
    [key],
  );

  return [value, set] as const;
}

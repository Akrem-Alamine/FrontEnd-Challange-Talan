import { useState, useEffect } from 'react';

/**
 * Custom hook for debouncing a value
 * Useful for search inputs to reduce API calls or expensive operations
 * @template T The type of value to debounce
 * @param {T} value The value to debounce
 * @param {number} delay The delay in milliseconds
 * @returns {T} The debounced value
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

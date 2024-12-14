import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

const useSetSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateSearchParams = useCallback(
    (key: string, value: string) => {
      setSearchParams(prev => {
        const newParams = new URLSearchParams(prev);
        if (value === '') {
          newParams.delete(key);
        } else {
          newParams.set(key, value);
        }
        return newParams;
      });
    },
    [setSearchParams],
  );

  return { updateSearchParams, searchParams };
};

export default useSetSearchParams;

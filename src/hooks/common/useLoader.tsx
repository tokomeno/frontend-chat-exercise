import { useState, useCallback } from 'react';

export const useLoader = (defaultValue: boolean = false) => {
  const [isLoading, setLoading] = useState(defaultValue);

  const startLoading = useCallback(() => {
    setLoading(true);
  }, [setLoading]);

  const stopLoading = useCallback(() => {
    setLoading(false);
  }, [setLoading]);

  return { isLoading, isNotLoading: !isLoading, startLoading, stopLoading };
};

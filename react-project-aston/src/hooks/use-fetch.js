import { useState, useCallback } from 'react';

const useFetch = (requestParams) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBooksHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://gutendex.com/books${requestParams}`
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const loadedData = await response.json();

      setData(loadedData);
      console.log(loadedData);
    } catch (e) {
      setError(e.message);
    }
    setIsLoading(false);
  }, [requestParams]);

  return {
    fetchBooksHandler,
    data,
    isLoading,
    error,
  };
};

export default useFetch;

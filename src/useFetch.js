import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        // Use relative URL instead of absolute
        const response = await fetch(`/api${url}`, { signal: abortController.signal });
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        
        const result = await response.json();
        // Handle different response formats from the backend
        if (result.success && result.data) {
          setData(result.data);
        } else {
          setData(result);
        }
        setError(null);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup function
    return () => abortController.abort();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
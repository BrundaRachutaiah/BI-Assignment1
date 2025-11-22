import { useState, useEffect } from 'react';
import { fetchEvents, fetchEventById } from './api';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        let result;
        
        if (url.startsWith('/events/') && url !== '/events') {
          // Extract ID from URL
          const id = url.split('/')[2];
          result = await fetchEventById(id);
        } else {
          result = await fetchEvents();
        }
        
        setData(result);
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
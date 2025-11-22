// src/useFetch.js
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
        
        // --- THIS IS THE KEY CHANGE ---
        // Determine the base URL based on the environment
        const isDev = import.meta.env.DEV;
        // In development, use the proxy. In production, use the .env variable.
        const baseURL = isDev ? '' : import.meta.env.VITE_API_URL;
        const fullUrl = `${baseURL}/api${url}`;

        const response = await fetch(fullUrl, { signal: abortController.signal });
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        
        const result = await response.json();
        // Handle the response format from your backend
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
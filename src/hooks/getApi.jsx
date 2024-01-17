import { useState, useEffect } from 'react';
import _debounce from 'lodash/debounce'

const getApi = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Debounce the fetchData function to limit the rate of API calls
  const fetchDataDebounced = _debounce(async () => {
    try {
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, 1000); // Adjust the debounce time (in milliseconds) as needed

  useEffect(() => {
    fetchDataDebounced();
    // Cancel the debounced function on component unmount
    return () => fetchDataDebounced.cancel();
  }, [url]);

  return { data, loading, error };
};

export default getApi;
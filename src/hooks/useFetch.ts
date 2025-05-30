import { useEffect, useState } from "react";

export function useFetch(fetchFn: Function, initialValue: any) {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<any>();
  const [fetchedData, setFetchedData] = useState(initialValue);

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const data = await fetchFn();
        setFetchedData(data);
      } catch (error: any) {
        setError({ message: error.message || "Failed to fetch data." });
      }

      setIsFetching(false);
    }

    fetchData();
  }, [fetchFn]);

  return {
    isFetching,
    fetchedData,
    error,
  };
}

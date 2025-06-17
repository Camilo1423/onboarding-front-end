import { useState, useEffect, useCallback, useRef } from "react";

function usePagination(
  fetchData,
  args = {},
  debounceTime = 300,
  localStorageKey = "itemsPerPage",
  initialFilters = {},
  featureFlag = false
) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(() => {
    const savedLimit = localStorage.getItem(localStorageKey);
    return savedLimit ? parseInt(savedLimit, 10) : 10;
  });
  const [totalPages, setTotalPages] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const previousPageRef = useRef(1);
  const [currentArgs, setCurrentArgs] = useState(args);
  const fetchTimeoutRef = useRef(null);

  const fetchDataHandler = useCallback(
    async (page) => {
      if (featureFlag) {
        setLoading(true);
        setError(null);
        try {
          const response = await fetchData({
            page,
            itemsPerPage,
            ...currentArgs,
          });
          setData(response.data.items || []);
          setTotalItems(response.data.totalItems || 0);
          setItemsPerPage(response.data.itemsPerPage || 10);
          const newTotalPages = Math.ceil(
            (response.data.totalItems || 0) / (response.data.itemsPerPage || 10)
          );
          setTotalPages(newTotalPages);
          if (page > newTotalPages && newTotalPages > 0) {
            setCurrentPage(newTotalPages);
          }
        } catch (err) {
          setError(err instanceof Error ? err : new Error("An error occurred"));
        } finally {
          setLoading(false);
        }
      }
    },
    [fetchData, currentArgs, currentPage]
  );

  const debouncedFetch = useCallback(
    (page) => {
      if (fetchTimeoutRef.current) {
        clearTimeout(fetchTimeoutRef.current);
      }
      fetchTimeoutRef.current = setTimeout(() => {
        fetchDataHandler(page);
      }, debounceTime);
    },
    [fetchDataHandler, debounceTime]
  );

  useEffect(() => {
    debouncedFetch(currentPage);
    return () => {
      if (fetchTimeoutRef.current) {
        clearTimeout(fetchTimeoutRef.current);
      }
    };
  }, [currentPage, debouncedFetch, currentArgs]);

  const validateFilters = useCallback(
    (currentFilters) => {
      const filtersAreDefault = Object.keys(initialFilters).every(
        (key) => initialFilters[key] === currentFilters[key]
      );
      if (filtersAreDefault) {
        setCurrentPage(previousPageRef.current);
      }
    },
    [initialFilters]
  );

  const onSearch = useCallback(
    (newArgs) => {
      previousPageRef.current = currentPage;
      setCurrentArgs((prevArgs) => ({ ...prevArgs, ...newArgs }));
      setCurrentPage(1);
      validateFilters(newArgs);
    },
    [currentPage, validateFilters]
  );

  const onPageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const nextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [currentPage, totalPages]);

  const prevPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [currentPage]);

  const setLimit = useCallback(
    (newLimit) => {
      setItemsPerPage(newLimit);
      localStorage.setItem(localStorageKey, newLimit.toString());
      setCurrentPage(1);
    },
    [localStorageKey]
  );

  const reload = useCallback(() => {
    fetchDataHandler(currentPage);
  }, [currentPage, fetchDataHandler]);

  return {
    data,
    currentPage,
    totalItems,
    totalPages,
    itemsPerPage,
    loading,
    error,
    onSearch,
    onPageChange,
    nextPage,
    prevPage,
    setLimit,
    reload,
  };
}

export default usePagination;

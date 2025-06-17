import { useSearchParams } from "react-router-dom";

const useSpecificQuery = (key) => {
  const [searchParams] = useSearchParams();
  return searchParams.get(key);
};

export default useSpecificQuery;

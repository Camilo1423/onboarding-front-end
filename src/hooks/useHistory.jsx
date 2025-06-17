import { useNavigate } from "react-router-dom";

const useHistory = () => {
  const navigate = useNavigate();

  const penultimatePath = () => {
    const storedHistory =
      JSON.parse(localStorage.getItem("navigationHistory")) || [];
    return storedHistory.length > 1 ? storedHistory[0] : null;
  };

  const handleGoBack = () => {
    const path = penultimatePath() == null ? "/" : penultimatePath();
    navigate(path);
  };

  const clearHistory = () => {
    localStorage.removeItem("navigationHistory");
  };

  return { penultimatePath, handleGoBack, clearHistory };
};

export default useHistory;

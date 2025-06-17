import { useCookie, useHistory } from "@Hooks";
import { useToast } from "@Providers";
import { ServiceLogout, ServiceSession } from "@Services";
import { clearSession, openModal, setSession } from "@Slice";
import { useDispatch } from "react-redux";

const useSession = () => {
  const dispatch = useDispatch();
  const { getCookie, removeCookie } = useCookie();
  const { addToast } = useToast();
  const { clearHistory } = useHistory();

  const signIn = async (user) => {
    dispatch(setSession({ ...user }));
  };

  const removeTempPassword = () => {
    dispatch(setSession({ is_enable_temp_pass: false }));
  };

  const reloadSession = async () => {
    try {
      const token = getCookie("tk");
      if (token == undefined) {
        dispatch(clearSession());
      } else {
        const resp = await ServiceSession();
        dispatch(setSession({ ...resp.data }));
      }
    } catch (_) {
      console.log(_);
      dispatch(openModal());
    }
  };

  const logout = async () => {
    try {
      addToast({
        type: "info",
        title: "Cerrando sesión",
        content: "Por favor espere un momento",
        duration: 3000,
        persistent: false,
      });
      const resp = await ServiceLogout();
      removeCookie("tk");
      removeCookie("rf");
      clearHistory();
      dispatch(clearSession());
      addToast({
        type: "success",
        title: "Sesión cerrada",
        content: resp.message,
        duration: 5000,
        persistent: false,
      });
    } catch (error) {
      return addToast({
        type: "destructive",
        title: error.error,
        content: error.message,
        duration: 3000,
        persistent: false,
      });
    }
  };

  const isExpired = () => {
    removeCookie("tk");
    removeCookie("rf");
    clearHistory();
    dispatch(clearSession());
  };

  const updateUserInformation = async (data) => {
    dispatch(
      setSession({
        first_name: data.first_name,
        second_name: data.second_name,
        first_last_name: data.first_last_name,
        second_last_name: data.second_last_name,
        number_phone: data.number_phone,
        username: data.username,
      })
    );
  };

  return {
    signIn,
    reloadSession,
    logout,
    isExpired,
    removeTempPassword,
    updateUserInformation,
  };
};

export default useSession;

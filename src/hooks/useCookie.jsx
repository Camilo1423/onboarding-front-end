import Cookies from "js-cookie";

const useCookie = () => {
  const setCookie = (key, value, options = {}) => {
    return Cookies.set(key, value, options);
  };

  const removeCookie = (key) => {
    return Cookies.remove(key);
  };

  const updateCookie = (key, value, options = {}) => {
    return Cookies.set(key, value, options);
  };

  const getCookie = (key) => {
    return Cookies.get(key);
  };

  return { setCookie, removeCookie, updateCookie, getCookie };
};

export default useCookie;
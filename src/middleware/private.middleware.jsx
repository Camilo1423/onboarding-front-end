import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateMiddleware = ({ children }) => {
  const redirecTo = "/";
  const user = useSelector((state) => state.session);
  if (user.user_email.length == 0) {
    return <Navigate to={redirecTo} />;
  }
  return children ?? <Outlet />;
};

PrivateMiddleware.propTypes = {
  children: PropTypes.node,
};

export default PrivateMiddleware;

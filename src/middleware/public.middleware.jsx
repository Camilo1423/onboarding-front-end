import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PublicMiddleware = ({ children }) => {
  const redirecTo = "/tablero/administracion-de-colaboradores";
  const user = useSelector((state) => state.session);

  console.log(user);

  if (user.user_email.length > 0) {
    return <Navigate to={redirecTo} />;
  }
  return children ?? <Outlet />;
};

PublicMiddleware.propTypes = {
  children: PropTypes.node,
};

export default PublicMiddleware;

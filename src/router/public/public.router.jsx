import { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { pathToRegexp } from "path-to-regexp";
import { LoadingScreen } from "@Components";
import { useChangeTitle } from "@Hooks";

const validRoutes = [
  {
    path: "/",
    Component: lazy(() => import("@Pages/public/SignIn/SignIn.page")),
  },
  {
    path: "/crear-cuenta",
    Component: lazy(() => import("@Pages/public/SignUp/SignUp.page")),
  },
  {
    path: "*",
    Component: lazy(() => import("@Pages/public/404/404.page")),
  },
];

const PublicRouter = () => {
  const location = useLocation();
  const { changeTitle } = useChangeTitle();

  useEffect(() => {
    const routeMatch = validRoutes.some((route) => {
      if (route.path === "*") return false;
      const regexp = pathToRegexp(route.path);
      return regexp.regexp.test(location.pathname);
    });

    if (!routeMatch) {
      changeTitle({ pathname: "/pagina-no-encontrada-404" });
    } else {
      changeTitle(location);
    }
  }, [location, changeTitle]);

  return (
    <Suspense fallback={<LoadingScreen text="Recuperando componente" />}>
      <div className="w-full h-screen flex items-center justify-center">
        <Routes>
          {validRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} Component={Component} />
          ))}
        </Routes>
      </div>
    </Suspense>
  );
};

export default PublicRouter;

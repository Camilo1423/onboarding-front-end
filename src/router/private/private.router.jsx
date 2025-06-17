import { LoadingScreen } from "@Components";
import { Navbar } from "@CptPrivate";
import { useChangeTitle } from "@Hooks";
import { pathToRegexp } from "path-to-regexp";
import { lazy, Suspense, useEffect, useMemo } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

const validRoutes = [
  {
    path: "/administracion-de-colaboradores",
    Component: lazy(() =>
      import("@Pages/private/Collaborators/Collaborator.page")
    ),
  },
  {
    path: "/calendario",
    Component: lazy(() =>
      import("@Pages/private/Calendar/Calendar.page")
    ),
  },
  {
    path: "*",
    Component: lazy(() => import("@Pages/private/404/404.page")),
  },
];

const PrivateRouter = () => {
  const location = useLocation();
  const { changeTitle } = useChangeTitle();

  useEffect(() => {
    const updateHistory = () => {
      const storedHistory =
        JSON.parse(localStorage.getItem("navigationHistory")) || [];
      const newHistory = [
        ...storedHistory,
        `${location.pathname}${location.search}`,
      ];
      if (newHistory.length > 2) newHistory.shift(); // Mantener solo las últimas dos rutas
      localStorage.setItem("navigationHistory", JSON.stringify(newHistory));
    };
    updateHistory();
  }, [location.pathname]);

  useEffect(() => {
    const routeMatch = validRoutes.some((route) => {
      if (route.path === "*") return false;
      if (route.path === "/") {
        const regexp = pathToRegexp(`/tablero`);
        return regexp.regexp.test(location.pathname);
      }
      const regexp = pathToRegexp(`/tablero${route.path}`);
      return regexp.regexp.test(location.pathname);
    });

    if (!routeMatch) {
      changeTitle({ pathname: "/pagina-no-encontrada-404" });
    } else {
      changeTitle(location);
    }
  }, [location, changeTitle]);

  const memoizedRoutes = useMemo(
    () => (
      <Routes>
        {validRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} Component={Component} />
        ))}
      </Routes>
    ),
    []
  );

  return (
    <Suspense fallback={<LoadingScreen text="Recuperando componente" />}>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        {memoizedRoutes}
      </div>
    </Suspense>
  );
};

export default PrivateRouter;

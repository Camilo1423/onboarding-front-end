import { ExpiredSession, LoadingScreen } from "@Components";
import { useSession } from "@Hooks";
import { PrivateMiddleware, PublicMiddleware } from "@Middleware";
import PackageJson from "@PackageJson";
import { ThemeBasic } from "@Theme";
import { cn } from "@Utils";
import { lazy, Suspense, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

const PublicRouter = lazy(() => import("@Router/public/public.router"));
const PrivateRouter = lazy(() => import("@Router/private/private.router"));

const Router = () => {
  const [isLoadin, setIsLoadin] = useState(true);
  const { reloadSession } = useSession();

  const reloadData = async () => {
    setIsLoadin(true);
    await reloadSession();
    setIsLoadin(false);
  };

  useEffect(() => {
    reloadData();
  }, []);

  if (isLoadin) return <LoadingScreen text="Recuperando sesión" />;

  return (
    <>
      <Suspense fallback={<LoadingScreen text="Recuperando componente" />}>
        <Routes>
          <Route element={<PublicMiddleware />}>
            <Route index path="/*" Component={PublicRouter} />
          </Route>
          <Route element={<PrivateMiddleware />}>
            <Route index path="/tablero/*" Component={PrivateRouter} />
          </Route>
        </Routes>
        <ExpiredSession />
      </Suspense>
      <div className="fixed bottom-2 right-2">
        <p className={cn("text-sm opacity-40", ThemeBasic.textGray)}>
          Powered by{" "}
          <a
            href="https://www.linkedin.com/in/andres-roa-9981ba169/"
            target="_blank"
            className={cn(
              ThemeBasic.text,
              ThemeBasic.hoverText,
              "transition-colors underline"
            )}
          >
            Andres Roa
          </a>
        </p>
      </div>
    </>
  );
};

export default Router;

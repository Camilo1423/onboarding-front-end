import { ThemeBasic } from "@Theme";
import { cn } from "@Utils";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className={cn("w-full h-screen flex items-center justify-center")}>
      <div className="flex flex-col items-center justify-center z-50">
        <div
          className={cn(
            "flex flex-col max-w-2xl gap-5 items-center justify-center text-center p-4 rounded-3xl border border-gray-200"
          )}
        >
          <h2 className={cn(ThemeBasic.title, "text-2xl font-semibold")}>
            ¡Ups! Parece que estamos un poco perdidos 😅
          </h2>
          <p className={cn(ThemeBasic.textGray)}>
            No pudimos encontrar la página que buscabas. Puede que el enlace
            esté roto, la página haya sido eliminada o que algo extraño haya
            ocurrido en el universo digital.
          </p>
          <p className={cn(ThemeBasic.textGray)}>
            Mientras tanto, puedes regresar al inicio o explorar otras secciones
            de nuestro sitio. Si necesitas ayuda, ¡no dudes en contactarnos!
          </p>
          <Link
            to={"/"}
            className={cn(
              "w-full max-w-60 rounded-full font-normal text-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-opacity-50 flex items-center justify-center py-2",
              ThemeBasic.backgroundPrimary,
              ThemeBasic.textWhite,
              ThemeBasic.hoverBackgroundPrimary
            )}
          >
            Regresar al inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;

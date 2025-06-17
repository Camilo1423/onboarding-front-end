import { ThemeBasic } from "@Theme";
import { cn } from "@Utils";
import Lottie from "lottie-react";
import NotFoundAnimation from "../../../assets/animations/404.json";
import { useHistory } from "@Hooks";

const NotFoundPage = () => {
  const { handleGoBack } = useHistory();

  return (
    <div className={cn("w-full h-full flex items-center justify-center")}>
      <div className="flex flex-col items-center justify-center">
        <div
          className={cn(
            ThemeBasic.backgroundWhite,
            "flex flex-col max-w-2xl gap-5 items-center justify-center text-center p-4"
          )}
        >
          <div
            className="flex items-center justify-center overflow-hidden"
            style={{ height: "300px", width: "300px" }}
          >
            <Lottie
              animationData={NotFoundAnimation}
              style={{
                width: "100%",
                height: "100%",
                contentVisibility: "visible",
              }}
              rendererSettings={{
                preserveAspectRatio: "xMidYMid slice",
              }}
              loop={true}
            />
          </div>
          <h2 className={cn(ThemeBasic.title, "text-2xl font-semibold")}>
            ¡Ups! Parece que estamos un poco perdidos 😅
          </h2>
          <p className={cn(ThemeBasic.textGray)}>
            No pudimos encontrar la página que buscabas. Puede que el enlace
            esté roto, la página haya sido eliminada o que algo extraño haya
            ocurrido en el universo digital.
          </p>
          <p className={cn(ThemeBasic.textGray)}>
            Mientras tanto, puedes regresar o explorar otras secciones de
            nuestro sitio. Si necesitas ayuda, ¡no dudes en contactarnos!
          </p>
          <button
            onClick={handleGoBack}
            type="button"
            className={cn(
              "w-full max-w-60 rounded-full font-normal text-md transition-all duration-300 flex items-center justify-center py-2",
              ThemeBasic.backgroundPrimary,
              ThemeBasic.textWhite,
              ThemeBasic.hoverBackgroundPrimary
            )}
          >
            Regresar
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;

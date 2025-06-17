import { ThemeBasic } from "@Theme";
import { cn } from "@Utils";
import PropTypes from "prop-types";

const LoadingScreen = ({ text = "Cargando componente..." }) => {
  return (
    <>
      <div className={cn("w-full h-screen flex items-center justify-center")}>
        <div className="w-full flex items-center justify-center gap-4">
          <p className={cn("text-2xl font-normal px-2 py-1", ThemeBasic.text)}>
            {text}
          </p>
        </div>
      </div>
      <div className="fixed bottom-2 right-2">
        <p className={cn("text-sm", ThemeBasic.textGray)}>
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

LoadingScreen.propTypes = {
  text: PropTypes.string,
};

export default LoadingScreen;

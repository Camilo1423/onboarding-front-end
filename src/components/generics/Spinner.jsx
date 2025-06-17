import { Spinner as NextSpinner } from "@nextui-org/react";
import { ThemeBasic } from "@Theme";

const Spinner = ({ size = "md" }) => {
  return (
    <NextSpinner
      size={size}
      classNames={{
        base: "flex justify-center items-center", // Estilos generales del Spinner
        wrapper: "bg-transparent rounded-full", // Fondo personalizado
        circle1: ThemeBasic.borderSpinner, // Color del círculo exterior
        circle2: ThemeBasic.borderSpinner, // Color del círculo exterior
      }}
    />
  );
};

export default Spinner;

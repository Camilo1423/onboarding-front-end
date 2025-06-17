import { capitalizarPalabra } from "@Utils";

const useChangeTitle = () => {
  const changeTitle = (newTitle) => {
    const title =
      extraerRutaActual(newTitle) === ""
        ? "Inicio"
        : extraerRutaActual(newTitle);
    const lastTitle = document.title.split("|");
    let titleFinal = title;
    if (title.includes("-")) {
      const tmpTitle = title.split("-");
      let tmpString = "";
      tmpTitle.forEach((word, index) => {
        if (index === tmpTitle.length - 1) {
          tmpString += `${capitalizarPalabra(word)}`;
        } else {
          tmpString += `${capitalizarPalabra(word)} `;
        }
      });
      titleFinal = tmpString;
    }
    document.title = `${capitalizarPalabra(titleFinal)} | ${lastTitle[1]}`;
  };

  const extraerRutaActual = (obj) => {
    const partes = obj.pathname.split("/").filter((part) => part !== "");

    const esUUID =
      /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;
    const esIDIncremental = /^\d+$/;
    const esToken = /^[a-f0-9]{32,}$/i;

    if (partes.length > 1) {
      const ultimaParte = partes[partes.length - 1];
      if (
        esUUID.test(ultimaParte) ||
        esIDIncremental.test(ultimaParte) ||
        esToken.test(ultimaParte)
      ) {
        return partes[partes.length - 2];
      }
    }

    return partes[partes.length - 1] || "";
  };

  return { changeTitle };
};

export default useChangeTitle;

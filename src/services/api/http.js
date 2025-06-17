import { Config } from "@Constant";
import Cookies from "js-cookie";
import { AxiosRequest } from "./remote";

const requestClass = new AxiosRequest(Config.Api, Config.isProd);

const endPoint = Config.Routes;

/***
 * @function Http
 * @description Metodo para lanzar la petición contra gateway
 * @param {datos} datos - Aqui envias el objeto que quieres que el backend reciba
 * @param {config} config - La configuración de la gateway se basa en un punto de entrada "base" (Servidor destino), enpoint de destino "entry" (Endpoint de destino) y el verbo http a utilizar
 ***/
const Http = async (
  datos,
  {
    base,
    entry,
    method,
    id = "none",
    isLogout = false,
    headers = {},
    isFormData = false,
  }
) => {
  try {
    const token = Cookies.get(!isLogout ? "tk" : "rf");
    if (token != undefined) {
      requestClass.setAuthToken(token);
    }
    let dataSend = Object.keys(datos).length > 0 ? { ...datos } : {};
    const baseWithId = `${endPoint[base][entry]}${id}`;
    const baseWithoutId = `${endPoint[base][entry]}`;
    let endPointFinal = id != "none" ? baseWithId : baseWithoutId;
    const data = await requestClass.ExecutePetition(
      endPointFinal,
      method,
      isFormData ? datos : { ...dataSend },
      headers
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export { Http };

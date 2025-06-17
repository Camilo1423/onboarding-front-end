import { Config } from "@Constant";
import { openModal } from "@Slice";
import { Store } from "@Store";
import axios from "axios";
import Cookies from "js-cookie";

export class AxiosRequest {
  urlBase = "";
  instanceAxios = null;
  prod = false;
  authToken = "";

  constructor(url, isProd) {
    this.urlBase = url;
    this.prod = isProd;
    this.executeBuilder();
  }

  setAuthToken = (token) => {
    this.authToken = token;
  };

  createInstance = () => {
    const instance = axios.create({
      baseURL: this.urlBase,
      timeout: 0,
      headers: {
        "Content-Type": "application/json",
      },
    });

    instance.interceptors.request.use((config) => {
      if (this.authToken) {
        config.headers["Authorization"] = `Bearer ${this.authToken}`;
      }
      return config;
    });

    instance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const originalRequest = error.config;

        // Verifica si el error es debido a un token expirado
        if (
          error.response.data.statusCode === 401 &&
          (error.response.data.message === "Unauthorized" ||
            error.response.data.message === "Sesión no encontrada") &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;

          try {
            // Intenta refrescar el token
            const newToken = await this.refreshTokenRequest();
            this.setAuthToken(newToken);

            // Actualiza el encabezado del token y reintenta la solicitud original
            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
            return this.instanceAxios(originalRequest);
          } catch (refreshError) {
            // Si no se puede refrescar el token, redirige al usuario al login
            console.log(
              "No se pudo refrescar el token. Redirigiendo al login."
            );
            Store.dispatch(openModal());
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );

    return instance;
  };

  refreshTokenRequest = async () => {
    const refreshToken = Cookies.get("rf");
    try {
      const response = await axios.post(
        `${this.urlBase}${Config.Routes.auth.refresh}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      );
      Cookies.set("tk", response.data.data.accessToken);
      Cookies.set("rf", response.data.data.refreshToken);
      return response.data.data.accessToken;
    } catch (error) {
      console.error("Error al refrescar el token", error);
      throw error;
    }
  };

  executeBuilder = () => {
    this.instanceAxios = this.createInstance();
    this.instanceAxios.interceptors.response.use((opt) => {
      if (!this.prod) {
        console.log("Code: ", opt.status);
      }
      return opt;
    });
    this.instanceAxios.interceptors.request.use((opt) => {
      if (!this.prod) {
        console.log(
          opt.baseURL + opt.url,
          opt.method,
          opt.data ? "Data: " + JSON.stringify(opt.data) : ""
        );
      }
      return opt;
    });
  };

  ExecutePetition = async (url, method, data = null, headers = {}) => {
    try {
      const config = {
        method: method.toLowerCase(),
        url,
        headers: {
          ...this.instanceAxios.defaults.headers.common,
          ...headers,
        },
        data,
      };

      const res = await this.instanceAxios.request(config);
      return res.data;
    } catch (e) {
      throw e;
    }
  };
}

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Config } from "@Constant";
import Cookies from "js-cookie";

const useAvatar = (type) => {
  const session = useSelector((state) => state.session);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const haveAvatar = session.images.length > 0;

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        // Encuentra los datos del avatar o temporal
        const avatar = session.images.find((image) => image.type === type);
        const temp = session.images.find((image) => image.type === "temp");

        if (!avatar && !temp) {
          setAvatarUrl(null);
          setIsLoading(false);
          return;
        }

        if (avatar != undefined) {
          if ("url" in avatar) {
            setAvatarUrl(avatar.url);
            setIsLoading(false);
            return;
          }
        }

        if (temp != undefined) {
          if ("url" in temp) {
            setAvatarUrl(temp.url);
            setIsLoading(false);
            return;
          }
        }

        const key = avatar ? avatar.key : temp.key;

        // Realiza la solicitud al servidor
        const resp = await fetch(
          `${Config.Api}/image/api/v1/statics/profile/${encodeURIComponent(
            key
          )}`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("tk")}`,
            },
          }
        );

        // Verifica si la respuesta es exitosa
        if (!resp.ok) {
          console.error(
            "Error al obtener la imagen:",
            resp.status,
            resp.statusText
          );
          setAvatarUrl(null);
          setIsLoading(false);
          return;
        }

        // Convierte la respuesta en un Blob y genera la URL
        const blob = await resp.blob();
        const url = URL.createObjectURL(blob);
        setAvatarUrl(url);
      } catch (error) {
        console.error("Error en getAvatar:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (haveAvatar) {
      fetchAvatar();
    } else {
      setAvatarUrl(null);
      setIsLoading(false);
    }
  }, [type, session, haveAvatar]);

  return { avatarUrl, isLoading, haveAvatar };
};

export default useAvatar;

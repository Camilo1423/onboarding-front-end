import React, {
  createContext,
  useContext,
  useCallback,
  useState,
  useRef,
  useMemo,
} from "react";
import PropTypes from "prop-types";

const ToastContext = createContext(undefined);

const MAX_TOASTS = 5; // Aumentamos el límite a 5 toasts

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timersRef = useRef({});

  /**
   * Añade un nuevo toast a la lista de toasts.
   *
   * @function addToast
   * @description Este método permite agregar un toast a la lista de toasts que se mostrarán en la aplicación.
   * @param {Object} toast - Objeto que representa el toast que se va a agregar.
   * @param {"success"|"info"|"destructive"|"warning"} toast.type - Tipo de toast (puede ser "info", "success", "error", etc.).
   * @param {string} toast.title - Título que se mostrará en el toast.
   * @param {string} toast.content - Contenido o mensaje principal que se mostrará en el toast.
   * @param {number} [toast.duration] - Duración en milisegundos antes de que el toast desaparezca automáticamente (si no es persistente).
   * @param {boolean} [toast.persistent=false] - Indica si el toast debe permanecer indefinidamente hasta que sea eliminado manualmente.
   * @example
   * // Ejemplo de uso:
   * addToast({
   *   type: "info",
   *   title: "Cerrando sesión",
   *   content: "Por favor espere un momento",
   *   duration: 3000,
   *   persistent: false,
   * });
   */

  const addToast = useCallback((toast) => {
    const id = Math.floor(Math.random() * 1_000_000_000);
    setToasts((currentToasts) => {
      const newToast = { ...toast, id };
      return [...currentToasts, newToast].slice(-MAX_TOASTS); // Keep only last 5 toasts
    });

    if (!toast.persistent && toast.duration) {
      const timer = setTimeout(() => {
        removeToast(id);
      }, toast.duration);
      timersRef.current[id] = {
        timer,
        remaining: toast.duration,
        start: Date.now(),
      };
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id)
    );
    if (timersRef.current[id]) {
      clearTimeout(timersRef.current[id].timer);
      delete timersRef.current[id];
    }
  }, []);

  const pauseToast = useCallback((id) => {
    const timerData = timersRef.current[id];
    if (timerData) {
      clearTimeout(timerData.timer);
      timerData.remaining -= Date.now() - (timerData.start || Date.now());
    }
  }, []);

  const resumeToast = useCallback(
    (id) => {
      const timerData = timersRef.current[id];
      if (timerData) {
        timerData.start = Date.now();
        timerData.timer = setTimeout(
          () => removeToast(id),
          timerData.remaining
        );
      }
    },
    [removeToast]
  );

  const contextValue = useMemo(
    () => ({
      toasts,
      addToast,
      removeToast,
      pauseToast,
      resumeToast,
    }),
    [toasts, addToast, removeToast, pauseToast, resumeToast]
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
    </ToastContext.Provider>
  );
}

ToastProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

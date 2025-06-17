/**
 * Formatea una fecha en función de la zona horaria del cliente.
 * @param {string} isoDate - Fecha en formato ISO (por ejemplo, "2024-12-22T19:23:46.370Z").
 * @returns {string} - Fecha formateada según la zona horaria del cliente.
 */
export function formatDateToLocalTime(isoDate) {
  try {
    // Crear un objeto Date desde la cadena ISO
    const date = new Date(isoDate);

    // Obtener la zona horaria del cliente
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Formatear la fecha según la zona horaria del cliente
    const formatter = new Intl.DateTimeFormat("default", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone,
      hour12: true, // Cambia a false si prefieres el formato de 24 horas
    });

    return formatter.format(date);
  } catch (error) {
    console.error("Error formateando la fecha:", error);
    return isoDate; // Retorna la fecha original en caso de error
  }
}

/**
 * Formatea una fecha a formato YYYY-MM-DD sin transformación de zona horaria.
 * @param {string} isoDate - Fecha en formato ISO (por ejemplo, "2024-12-22T19:23:46.370Z").
 * @returns {string} - Fecha formateada en formato YYYY-MM-DD.
 */
export function formatDateOnly(isoDate) {
  try {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  } catch (error) {
    console.error("Error formateando la fecha:", error);
    return isoDate; // Retorna la fecha original en caso de error
  }
}

/**
 * Formatea una fecha a formato YYYY-MM-DD, asegurando que los meses y días tengan dos dígitos.
 * @param {string|Date} date - Fecha a formatear (puede ser string o objeto Date)
 * @returns {string} - Fecha formateada en formato YYYY-MM-DD
 */
export function formatToYYYYMMDD(date) {
  try {
    const dateObj = date instanceof Date ? date : new Date(date);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  } catch (error) {
    console.error("Error formateando la fecha:", error);
    return date; // Retorna la fecha original en caso de error
  }
}

/**
 * Divide una fecha y hora en fecha y hora separadas.
 * @param {string} dateTime - Fecha y hora en formato ISO (por ejemplo, "2024-12-22T19:23:46.370Z").
 * @returns {Object} - Objeto con fecha y hora formateadas.
 */
export function splitDateTime(dateTime) {
  const date = new Date(dateTime);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ?? 12; // Convert 0 to 12
  const formattedTime = `${hours}:${minutes} ${ampm}`;

  return {
    date: formattedDate,
    time: formattedTime,
  };
}

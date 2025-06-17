import moment from "moment-timezone";

const formatDateToDeviceTimeZone = (dateString) => {
  const deviceTimeZone = moment.tz.guess(); // Detectar la zona horaria del dispositivo
  const date = moment.utc(dateString).tz(deviceTimeZone); // Convertir la fecha a la zona horaria del dispositivo

  const today = moment().tz(deviceTimeZone).startOf("day"); // Inicio del día en la zona horaria del dispositivo

  if (date.isSame(today, "day")) {
    return date.format("h:mm A"); // Formato solo hora si es hoy
  } else {
    return date.format("DD/MM/YYYY h:mm A"); // Formato fecha completa si no es hoy
  }
};

export { formatDateToDeviceTimeZone };

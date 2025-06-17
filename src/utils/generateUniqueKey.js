export function generateUniqueKey() {
  const date = new Date();

  // Obtén la fecha y hora en un formato concatenado
  const timestamp = `${date.getFullYear()}${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}${date.getDate().toString().padStart(2, "0")}${date
    .getHours()
    .toString()
    .padStart(2, "0")}${date.getMinutes().toString().padStart(2, "0")}${date
    .getSeconds()
    .toString()
    .padStart(2, "0")}${date.getMilliseconds().toString().padStart(3, "0")}`;

  // Genera 10 caracteres aleatorios (letras y números)
  const randomChars = Array.from({ length: 10 }, () =>
    Math.random().toString(36).charAt(2)
  ).join("");

  return `${timestamp}${randomChars}`;
}

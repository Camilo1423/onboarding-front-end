export function capitalizarPalabra(cadena) {
  // Dividimos la cadena en palabras usando un espacio como separador
  var palabras = cadena.split(" ");

  // Iteramos sobre cada palabra y capitalizamos la primera letra
  for (var i = 0; i < palabras.length; i++) {
    palabras[i] = palabras[i][0].toUpperCase() + palabras[i].slice(1);
  }

  // Unimos las palabras nuevamente en una cadena y las retornamos
  return palabras.join(" ");
}

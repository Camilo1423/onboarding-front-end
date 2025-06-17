export function isValidEmail(input) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailRegex.test(input)) {
    return true; // Es un correo válido
  }

  // Validar nombre de usuario: sin espacios
  return !/\s/.test(input);
}

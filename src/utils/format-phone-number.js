export function formatPhoneNumber(phoneNumberString) {
  // Eliminar todo lo que no sea un número
  const cleaned = ("" + phoneNumberString).replace(/\D/g, "");
  // Intentar hacer coincidir con el patrón de 10 dígitos
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return "+57 " + "(" + match[1] + ") " + match[2] + "-" + match[3];
  }
  return null;
}



// Función para validar el formato de un correo electrónico
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar el formato básico de un correo electrónico
    return emailRegex.test(email);
  };
  
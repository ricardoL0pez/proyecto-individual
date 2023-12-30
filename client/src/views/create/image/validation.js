const validation = (input) => {
    const errors = {}; // Objeto que almacenará los errores de validación
  
    // Verifica si el campo de imagen está vacío después de eliminar espacios en blanco al inicio y al final
    if (!input.image.trim()) {
      errors.image = "Campo obbligatorio"; // Establece un error si el campo está vacío
    } else {
      const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/; // Expresión regular para validar la URL
  
      // Verifica si el valor de 'input.image' no cumple con el patrón de la expresión regular para una URL válida
      if (!urlPattern.test(input.image)) {
        errors.image = "Inserire un URL valido"; // Establece un error si no es una URL válida
      }
    }
  
    return errors; // Devuelve el objeto de errores (puede estar vacío si no hay errores)
  };
  
  export default validation; // Exporta la función 'validation' para su uso en otros archivos
  
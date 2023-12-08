// almacenar todas las constantes globales
//De esta manera, al centralizar tus constantes en un archivo de configuración, puedes mantener la coherencia en todo tu código y facilitar la modificación de esas constantes si es necesario. Además, si necesitas agregar o cambiar URLs o cualquier otra configuración global, solo tendrás que hacerlo en un solo lugar, en lugar de buscar y cambiar en varios archivos.

const config = {
    URL_BASE: 'https://pokeapi.co/api/v2/pokemon/',
    URL_TYPE : ('https://pokeapi.co/api/v2/type/')

};
  
  module.exports = config;
  
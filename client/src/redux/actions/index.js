import { GET_ALL_POKEMONS } from "./action-types"; // Importa los tipos de acciones desde el archivo action-types.js
import axios from "axios"; // Importa Axios para hacer peticiones HTTP

// ACTION CREATOR para obtener personajes usando Axios con async-await
export const getPokemons = () => {
    return async function(dispatch) {
        const response = await axios('https://jsonplaceholder.typicode.com/users'); // Realiza una solicitud GET para obtener datos de personajes desde una API (JSONPlaceholder en este caso)
        dispatch({ type: GET_ALL_POKEMONS, payload: response.data }); // Despacha una acción con el tipo GET_CHARACTERS y los datos obtenidos como carga útil (payload)
        // No se necesita manejo de error aquí, será manejado donde se llame a la función getCharacters.
        return response; // Opcional: Puedes retornar la respuesta si es necesario.
    };
};

// ACTION CREATOR para agregar un nuevo personaje
/* export const addCharacter = (newCharacter) => {
    return { type: ADD_CHARACTER, payload: newCharacter }; // Retorna una acción con el tipo ADD_CHARACTER y el nuevo personaje como carga útil (payload)
}; */

// ACTION CREATOR para eliminar un personaje
/* export const removeCharacter = (id) => {
    return { type: REMOVE_CHARACTERS, payload: id }; // Retorna una acción con el tipo REMOVE_CHARACTERS y el ID del personaje a eliminar como carga útil (payload)
}; */
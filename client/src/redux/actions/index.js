import { GET_ALL_POKEMONS, GET_POKEMON_ID, CLEAN_DETAIL, GET_POKEMON_BY_NAME, GET_ALL_TYPES } from "./action-types"; // Importa los tipos de acciones desde el archivo action-types.js
import axios from "axios"; // Importa Axios para hacer peticiones HTTP

import { URL_BASE, URL_TYPE } from "../../utils/config";


// ACTION CREATOR para obtener personajes usando Axios con async-await
export const getAllPokemons = () => {
    return async function(dispatch) {
        const response = await axios(URL_BASE); // Realiza una solicitud GET para obtener datos de personajes desde una API (JSONPlaceholder en este caso)
        dispatch({ type: GET_ALL_POKEMONS, payload: response.data }); // Despacha una acción con el tipo GET_CHARACTERS y los datos obtenidos como carga útil (payload)
        // No se necesita manejo de error aquí, será manejado donde se llame a la función getCharacters.
    };
};


export const getPokemonId = (id) => {
    return async function(dispatch) {
        const response = await axios(`${URL_BASE}${id}`); // Realiza una solicitud GET para obtener datos de personajes desde una API (JSONPlaceholder en este caso)
        dispatch({ type: GET_POKEMON_ID, payload: response.data }); // Despacha una acción con el tipo GET_CHARACTERS y los datos obtenidos como carga útil (payload)
        // No se necesita manejo de error aquí, será manejado donde se llame a la función getCharacters.
    };
};

export const getPokemonByName = (name) => {
    return async function(dispatch) {
        const response = await axios(`http://localhost:3001/pokemons/?name=${name}`); // Utilizo template strings para que el valor del nombre sea dinamico
        dispatch({ type: GET_POKEMON_BY_NAME, payload: response.data }); // Despacha una acción con el tipo GET_CHARACTERS y los datos obtenidos como carga útil (payload)
        // No se necesita manejo de error aquí, será manejado donde se llame a la función getCharacters.
    };
};

export const getAllTypes = () => {
    return async function(dispatch) {
        const response = await axios(URL_TYPE); // Realiza una solicitud GET para obtener datos de personajes desde una API (JSONPlaceholder en este caso)
        dispatch({ type: GET_ALL_TYPES, payload: response.data }); // Despacha una acción con el tipo GET_CHARACTERS y los datos obtenidos como carga útil (payload)
        // No se necesita manejo de error aquí, será manejado donde se llame a la función getCharacters.
    };
};

export const cleanDetail = () => {
    return {
        type: CLEAN_DETAIL
    };
};

/* const infoApi = (await axios.get(URL_TYPE)).data.results.map((nameTypeApi) => {
    return { name: nameTypeApi.name }; */

// ACTION CREATOR para agregar un nuevo personaje
/* export const addCharacter = (newCharacter) => {
    return { type: ADD_CHARACTER, payload: newCharacter }; // Retorna una acción con el tipo ADD_CHARACTER y el nuevo personaje como carga útil (payload)
}; */

// ACTION CREATOR para eliminar un personaje
/* export const removeCharacter = (id) => {
    return { type: REMOVE_CHARACTERS, payload: id }; // Retorna una acción con el tipo REMOVE_CHARACTERS y el ID del personaje a eliminar como carga útil (payload)
}; */
import {
    GET_ALL_POKEMONS,
    GET_POKEMON_ID,
    CLEAN_DETAIL,
    GET_POKEMON_BY_NAME,
    GET_ALL_TYPES,
    CREATE_POKEMON,
    ORDER_BY_NAME, 
    FILTER_TYPE,
    FILTER_BY_ORIGIN
} from "./action-types"; // Importa los tipos de acciones desde el archivo action-types.js
import axios from "axios"; // Importa Axios para hacer peticiones HTTP

import { URL_BASE, URL_TYPE } from "../../utils/config";


// ACTION CREATOR para obtener personajes usando Axios con async-await
export const getAllPokemons = () => {
    return async function (dispatch) {
        const response = await axios(URL_BASE); // Realiza una solicitud GET para obtener datos de personajes desde una API (JSONPlaceholder en este caso)
        dispatch({ type: GET_ALL_POKEMONS, payload: response.data }); // Despacha una acción con el tipo GET_CHARACTERS y los datos obtenidos como carga útil (payload)
        // No se necesita manejo de error aquí, será manejado donde se llame a la función getCharacters.
    };
};


export const getPokemonId = (id) => {
    return async function (dispatch) {
        const response = await axios(`${URL_BASE}${id}`); // Realiza una solicitud GET para obtener datos de personajes desde una API (JSONPlaceholder en este caso)
        dispatch({ type: GET_POKEMON_ID, payload: response.data }); // Despacha una acción con el tipo GET_CHARACTERS y los datos obtenidos como carga útil (payload)
        // No se necesita manejo de error aquí, será manejado donde se llame a la función getCharacters.
    };
};

export const getPokemonByName = (name) => {
    return async function (dispatch) {
        const response = await axios(`${URL_BASE}?name=${name}`); // Utilizo template strings para que el valor del nombre sea dinamico
        dispatch({ type: GET_POKEMON_BY_NAME, payload: response.data }); // Despacha una acción con el tipo GET_CHARACTERS y los datos obtenidos como carga útil (payload)
        // No se necesita manejo de error aquí, será manejado donde se llame a la función getCharacters.
    };
};

export const getAllTypes = () => {
    return async function (dispatch) {
        const response = await axios(URL_TYPE); // Realiza una solicitud GET para obtener datos de personajes desde una API (JSONPlaceholder en este caso)
        dispatch({ type: GET_ALL_TYPES, payload: response.data }); // Despacha una acción con el tipo GET_CHARACTERS y los datos obtenidos como carga útil (payload)
        // No se necesita manejo de error aquí, será manejado donde se llame a la función getCharacters.
    };
};

export const createPokemon = (pokemonData) => {
    return async function (dispatch) {
        const response = await axios.post(URL_BASE, pokemonData); // Realiza una solicitud POST para almacenar datos en la base de datos
        dispatch({ type: CREATE_POKEMON, payload: response.data }); // Despacha una acción con el tipo GET_CHARACTERS y los datos obtenidos como carga útil (payload)
        // No se necesita manejo de error aquí, será manejado donde se llame a la función getCharacters.
    };
};

export const cleanDetail = () => {
    return {
        type: CLEAN_DETAIL
    };
};

export const orderByName = (order) => {
    return {
        type: ORDER_BY_NAME,
        payload: order
    };
};

export const filterType = (selectedType) => { // recibe el valor seleccionado del menú desplegable como payload
    return {
        type: FILTER_TYPE,
        payload: selectedType
    };
};

 export const filterByOrigin = (selectedOrigin) => { // recibe el valor seleccionado del menú desplegable como payload
    return {
        type: FILTER_BY_ORIGIN,
        payload: selectedOrigin
    };
}; 

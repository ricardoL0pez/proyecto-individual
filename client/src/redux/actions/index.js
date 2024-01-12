import {
    GET_ALL_POKEMONS,
    GET_POKEMON_ID,
    CLEAN_DETAIL,
    GET_POKEMON_BY_NAME,
    GET_ALL_TYPES,
    CREATE_POKEMON,
    ORDER_BY_NAME, 
    FILTER_TYPE,
    FILTER_BY_ORIGIN,
    FILTER_BY_ATTACK
} from "./action-types"; 
import axios from "axios"; 

import { URL_BASE, URL_TYPE } from "../../utils/config";

// ACTION CREATOR para obtener personajes usando Axios con async-await
export const getAllPokemons = () => {
    return async function (dispatch) {
        const response = await axios(URL_BASE); 
        dispatch({ type: GET_ALL_POKEMONS, payload: response.data }); 
        
    };
};

export const getPokemonId = (id) => {
    return async function (dispatch) {
        const response = await axios(`${URL_BASE}${id}`); 
        dispatch({ type: GET_POKEMON_ID, payload: response.data }); 
    };
};

export const getPokemonByName = (name) => {
    return async function (dispatch) {
        const response = await axios(`${URL_BASE}?name=${name}`); 
        dispatch({ 
            type: GET_POKEMON_BY_NAME, 
            payload: response.data }); 
    };
};

export const getAllTypes = () => {
    return async function (dispatch) {
        const response = await axios(URL_TYPE); 
        dispatch({ type: GET_ALL_TYPES, payload: response.data }); 
    };
};

export const createPokemon = (pokemonData) => {
    return async function (dispatch) {
        const response = await axios.post(URL_BASE, pokemonData); 
        dispatch({ type: CREATE_POKEMON, payload: response.data }); 
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

export const filterType = (selectedType) => { 
    return {
        type: FILTER_TYPE,
        payload: selectedType
    };
};

 export const filterByOrigin = (selectedOrigin) => { 
    return {
        type: FILTER_BY_ORIGIN,
        payload: selectedOrigin
    };
}; 

export const filterByAttack = (selectedAttack) => { 
    return {
        type: FILTER_BY_ATTACK,
        payload: selectedAttack
    };
}; 
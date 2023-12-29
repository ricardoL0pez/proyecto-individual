import {
    GET_ALL_POKEMONS,
    GET_POKEMON_ID,
    GET_POKEMON_BY_NAME,
    CLEAN_DETAIL,
    GET_ALL_TYPES,
    CREATE_POKEMON,
    ORDER_BY_NAME,
    FILTER_TYPE,
    FILTER_BY_ORIGIN
} from "../actions/action-types";
// Importa los tipos de acciones (action types) desde el archivo action-types.js

// ESTADO GLOBAL INICIAL
const initialState = {
    pokemons: [], // Estado inicial con un arreglo vacío para almacenar los personajes
    pokemonsCopy: [],
    pokemonDetail: [],
    types: [],
    createPokemon: []
};

// REDUCER
const rootReducer = (state = initialState, action) => {
    // La función rootReducer toma dos argumentos: state (estado actual) y action (acción despachada)
    switch (action.type) {
        case GET_ALL_POKEMONS:
            // Caso GET_CHARACTERS: actualiza el estado con los personajes obtenidos desde action.payload
            return {
                ...state,
                pokemons: action.payload,
                pokemonsCopy: action.payload
            };

        case GET_POKEMON_ID:
            // Caso GET_CHARACTERS: actualiza el estado con los personajes obtenidos desde action.payload
            return {
                ...state,
                pokemonDetail: action.payload
            };

        case CLEAN_DETAIL:
            return {
                ...state,
                pokemonDetail: {}
            }

        case GET_POKEMON_BY_NAME:
            // Caso GET_CHARACTERS: actualiza el estado con los personajes obtenidos desde action.payload
            return {
                ...state,
                pokemons: action.payload
            };

        case GET_ALL_TYPES:
            // Caso GET_CHARACTERS: actualiza el estado con los personajes obtenidos desde action.payload
            return {
                ...state,
                types: action.payload
            };

        case CREATE_POKEMON:
            // Caso GET_CHARACTERS: actualiza el estado con los personajes obtenidos desde action.payload
            return {
                ...state,
                createPokemon: action.payload
            };

        case ORDER_BY_NAME:
            const allPokemons = [...state.pokemons];
            if (action.payload === "A-Z") {
                allPokemons.sort((a, b) =>
                    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
                );
                return {
                    ...state,
                    pokemons: allPokemons,
                };
            } else if (action.payload === "Z-A") {
                allPokemons.sort((a, b) =>
                    b.name.toLowerCase().localeCompare(a.name.toLowerCase())
                );
                return {
                    ...state,
                    pokemons: allPokemons,
                };
            }

        case FILTER_TYPE:
            let filteredTypes;
            let noTypeResults = false;

            if (action.payload === "allTypes") {
                filteredTypes = state.pokemonsCopy;
            } else {
                filteredTypes = state.pokemonsCopy.filter((pokemon) =>
                    pokemon.types.includes(action.payload)
                );

                if (filteredTypes.length === 0) {
                    noTypeResults = true;
                }
            }

            return {
                ...state,
                pokemons: filteredTypes,
                noTypeResults: noTypeResults
            };


        case FILTER_BY_ORIGIN:
            let filteredByOrigin;

            if (action.payload === "Bd") {
                filteredByOrigin = state.pokemonsCopy.filter(pokemon => pokemon.created === true);
            } else if (action.payload === "Api") {
                filteredByOrigin = state.pokemonsCopy.filter(pokemon => pokemon.created === undefined);
            } else {
                filteredByOrigin = state.pokemons; // Otra lógica para el filtrado en otro caso
            }

            return {
                ...state,
                pokemons: filteredByOrigin
            };



        default:
            // Caso por defecto: en caso de no coincidir con ninguna acción conocida, retorna el estado actual
            return { ...state };
    }
};

export default rootReducer; // Exporta el rootReducer para ser utilizado en la configuración del store de Redux

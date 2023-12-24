import { GET_ALL_POKEMONS, GET_POKEMON_ID, GET_POKEMON_BY_NAME, CLEAN_DETAIL, GET_ALL_TYPES} from "../actions/action-types";
// Importa los tipos de acciones (action types) desde el archivo action-types.js

// ESTADO GLOBAL INICIAL
const initialState = {
    pokemons: [], // Estado inicial con un arreglo vacío para almacenar los personajes
    pokemonsCopy: [],
    pokemonDetail: [],
    types:[]
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

        default:
            // Caso por defecto: en caso de no coincidir con ninguna acción conocida, retorna el estado actual
            return { ...state };
    }
};

export default rootReducer; // Exporta el rootReducer para ser utilizado en la configuración del store de Redux

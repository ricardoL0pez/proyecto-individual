import { GET_ALL_POKEMONS } from "../actions/action-types";
// Importa los tipos de acciones (action types) desde el archivo action-types.js

// ESTADO GLOBAL INICIAL
const initialState = {
    pokemon: [] // Estado inicial con un arreglo vacío para almacenar los personajes
};

// REDUCER
const rootReducer = (state = initialState, action) => {
    // La función rootReducer toma dos argumentos: state (estado actual) y action (acción despachada)
    switch (action.type) {
        case GET_ALL_POKEMONS:
            // Caso GET_CHARACTERS: actualiza el estado con los personajes obtenidos desde action.payload
            return { ...state, pokemon: action.payload };

        default:
            // Caso por defecto: en caso de no coincidir con ninguna acción conocida, retorna el estado actual
            return { ...state };
    }
};

export default rootReducer; // Exporta el rootReducer para ser utilizado en la configuración del store de Redux
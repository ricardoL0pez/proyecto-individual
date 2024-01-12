import {
    GET_ALL_POKEMONS,
    GET_POKEMON_ID,
    GET_POKEMON_BY_NAME,
    CLEAN_DETAIL,
    GET_ALL_TYPES,
    CREATE_POKEMON,
    ORDER_BY_NAME,
    FILTER_TYPE,
    FILTER_BY_ORIGIN,
    FILTER_BY_ATTACK
} from "../actions/action-types";


// ESTADO GLOBAL INICIAL
const initialState = {
    pokemons: [], 
    pokemonsCopy: [],
    pokemonDetail: [],
    types: [],
    createPokemon: []
};

// REDUCER
const rootReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case GET_ALL_POKEMONS:
           
            return {
                ...state,
                pokemons: action.payload,
                pokemonsCopy: action.payload
            };

        case GET_POKEMON_ID:
            
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
           
            return {
                ...state,
                pokemons: action.payload,
                
            };

        case GET_ALL_TYPES:
            return {
                ...state,
                types: action.payload
            };

        case CREATE_POKEMON:
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
    return {
        ...state,
        pokemons: pokemonsToOrder,
    }; 

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
                filteredByOrigin = state.pokemonsCopy.filter(pokemon => pokemon.created === true);//copy
            } else if (action.payload === "Api") {
                filteredByOrigin = state.pokemonsCopy.filter(pokemon => pokemon.created === undefined);//copy
            } else {
                filteredByOrigin = state.pokemons;
            }
            return {
                ...state,
                pokemons: filteredByOrigin
            };  
           
        case FILTER_BY_ATTACK:
            let filteredByAttack;

            if(action.payload === "Piu+") {
                filteredByAttack = state.pokemons.slice().sort((a,b) => b.attack - a.attack);
            } else if (action.payload === "Piu-") {
                filteredByAttack = state.pokemons.slice().sort((a,b)=>a.attack - b.attack);
            } else {
                filteredByAttack = state.pokemons;
            }
            return {
                ...state,
                pokemons: filteredByAttack
            }
        default:
           
            return { ...state };
    }
};

export default rootReducer;

import { 
    LIST_ALL_POKEMONS,
    FIND_POKEMON_BY_ID,
    FIND_POKEMON_BY_NAME,
    GET_POKEMON_TYPES,
    ADD_NEW_POKEMON,
    FETCHING_ERRORS,
    CLEAR_LOCAL_POKEMONS,
    SET_EN,
    SET_ES
} from "../actionTypes/actionTypes";

const initalState = {
    pokemonsFromAPI: [],
    localPokemons: [],
    filtered: [],
    types: [],
    pokeById: {},
    error: {},
    lang: 'es'
}

function rootReducer(state = initalState, action){
    switch(action.type){
        case LIST_ALL_POKEMONS:
            return{
                ...state,
                pokemonsFromAPI: action.payload[0],
                localPokemons: action.payload[1]
            }
        case FIND_POKEMON_BY_ID:
            return{
                ...state,
                pokeById: action.payload
            }
        case FIND_POKEMON_BY_NAME:
            return{
                ...state,
                filtered: action.payload
            }
        case GET_POKEMON_TYPES:
            return{
                ...state,
                types: action.payload
            }
        case ADD_NEW_POKEMON:
            return{
               ...state,
               localPokemons: state.localPokemons.concat(action.payload)
            }
        case FETCHING_ERRORS:
            return{
                ...state,
                error: action.payload
            }
        case CLEAR_LOCAL_POKEMONS:
            return{
                ...state,
                localPokemons: []
            }
        case SET_EN:
            return{
                ...state,
                lang: action.payload
            }
        case SET_ES:
            return{
                ...state,
                lang: action.payload
            }
        default:
            return state;
    }
}

export default rootReducer;

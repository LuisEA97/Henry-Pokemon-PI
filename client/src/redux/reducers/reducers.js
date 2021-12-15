import { 
    LIST_ALL_POKEMONS,
    FIND_POKEMON_BY_ID,
    FIND_POKEMON_BY_NAME,
    GET_POKEMON_TYPES,
    ADD_NEW_POKEMON,
    FETCHING_ERRORS,
    CLEAR_LOCAL_POKEMONS,
    SET_EN,
    SET_ES,
    FILTER_BY,
    SET_NAVBAR_BG,
    FILTER_API,
    FILTER_LOCAL
} from "../actionTypes/actionTypes";

const initalState = {
    navbarBg: '',
    pokemonsFromAPI: [],
    localPokemons: [],
    filteredAPI: [],
    filteredLocal: [],
    types: [],
    pokeById: '',
    error: {},
    lang: 'es',
    localOrApi: 'API'
}

function rootReducer(state = initalState, action){
    switch(action.type){
        case SET_NAVBAR_BG:
            return{
                ...state,
                navbarBg: action.payload
            }
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
                filteredAPI: action.payload[0],
                filteredLocal: action.payload[1]
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
        case FILTER_API:
            return {
                ...state,
                localOrApi: 'API'
            }
        case FILTER_LOCAL:
            return {
                ...state,
                localOrApi: 'LOCAL'
            }
        case FILTER_BY:
            let filters = action.payload;
            let results = []
            let localFiltered = []
            let pokemonsFromApi = state.pokemonsFromAPI.filter(pokemon => {
                if(filters.showing ==='all') return pokemon
                else {
                    if(pokemon.types.findIndex(type => type.en === filters.showing) !== -1){
                        return pokemon
                      }
                }
            })
            let pokemonsFromLocal = state.localPokemons.filter(pokemon => {
                if(filters.showing ==='all') return pokemon
                else {
                    if(pokemon.types.findIndex(type => type.en === filters.showing) !== -1){
                        return pokemon
                      }
                }
            })
            if(filters.type === 'less_pw') {
                results = pokemonsFromApi.sort((a, b) => a.attack - b.attack)
                localFiltered = pokemonsFromLocal.sort((a, b) => a.attack - b.attack)

                pokemonsFromApi = results
                pokemonsFromLocal = localFiltered
            } 
            if(filters.type === 'most_pw') {
                results = pokemonsFromApi.sort((a, b) => b.attack - a.attack)
                localFiltered = pokemonsFromLocal.sort((a, b) => b.attack - a.attack)

                pokemonsFromApi = results
                pokemonsFromLocal = localFiltered
            } 
            if(filters.type === 'name_desc') {
                results = pokemonsFromApi.sort(function(a, b){
                    if(a.name < b.name) { return 1; }
                    if(a.name > b.name) { return -1; }
                    return 0;
                })
                localFiltered = pokemonsFromLocal.sort(function(a, b){
                    if(a.name < b.name) { return 1; }
                    if(a.name > b.name) { return -1; }
                    return 0;
                })
                
                pokemonsFromApi = results
                pokemonsFromLocal = localFiltered
            } 
            if(filters.type === 'name_asc') {
                results = pokemonsFromApi.sort(function(a, b){
                    if(a.name < b.name) { return -1; }
                    if(a.name > b.name) { return 1; }
                    return 0;
                })
                localFiltered = pokemonsFromLocal.sort(function(a, b){
                    if(a.name < b.name) { return -1; }
                    if(a.name > b.name) { return 1; }
                    return 0;
                })

                pokemonsFromApi = results
                pokemonsFromLocal = localFiltered
            } 

            return{
                ...state,
                filteredAPI: pokemonsFromApi,
                filteredLocal: pokemonsFromLocal

            }

        default:
            return state;
    }
}

export default rootReducer;

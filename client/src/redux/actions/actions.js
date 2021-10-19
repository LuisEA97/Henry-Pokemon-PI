import { 
    LIST_ALL_POKEMONS,
    FIND_POKEMON_BY_ID,
    FIND_POKEMON_BY_NAME,
    GET_POKEMON_TYPES,
    ADD_NEW_POKEMON,
    FETCHING_ERRORS,
    CLEAR_LOCAL_POKEMONS,
    UPDATE_LOCAL_POKEMONS,
    SET_EN,
    SET_ES,
    FILTER_BY
} from "../actionTypes/actionTypes";

const axios = require('axios').default

export function listAllPokemons(allPokemons){
    return {
        type: LIST_ALL_POKEMONS,
        payload: allPokemons
    }
}

export function findPokemonByName(found){
    return {
        type: FIND_POKEMON_BY_NAME,
        payload: found
    }
}

export function findPokemonById(found){
    return {
        type: FIND_POKEMON_BY_ID,
        payload: found
    }
}

export function getPokemonTypes(types){
    return{
        type: GET_POKEMON_TYPES,
        payload: types
    }
}

export function addNewPokemon(poke){
    return {
        type: ADD_NEW_POKEMON,
        payload: poke
    }
}

export function updateLocalPokemons(){
    return function(dispatch){
        return axios.get('http://localhost:3001/pokemons/local')
        .then(response => {
            dispatch({
                type: UPDATE_LOCAL_POKEMONS,
                payload: response.data
            })
        })
        .catch(error => {
            dispatch({
                type: FETCHING_ERRORS,
                payload: error
            })
        })
    }
}

export function clearLocalPokemons(){
    return {
        type: CLEAR_LOCAL_POKEMONS
    }
}
export function setEn(){
    return{
        type: SET_EN,
        payload: 'en'
    }
}
export function setEs(){
    return{
        type: SET_ES,
        payload: 'es'
    }
}
export function filterBy(activeFilters){
    return{
        type: FILTER_BY,
        payload: activeFilters
    }
}
import React, { useEffect } from 'react';
import PokeCard from '../../components/pokeCard/pokeCard'
import s from './Home.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom"

const Home = () => {
    const pokemons = useSelector(store => store.pokemonsFromAPI)
    const history = useHistory()
    const localPokemons = useSelector(store => store.localPokemons)
    console.log(pokemons)

    useEffect(() => {
        if(pokemons.length === 0){
            history.push('/')
        }
    }, [])

    return (
        <div className={s.main}>
            <h3>This is a homepage</h3>
            <div className={s.Cards}>
                {
                    pokemons.map(pokemon => <PokeCard key={pokemon.id} pokemon={pokemon}/>)
                }  
            </div>            
        </div>
    )
}

export default Home

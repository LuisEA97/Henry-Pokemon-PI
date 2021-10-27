import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import s from './styles/Pagination.module.css'
import PokeCard from '../pokeCard/pokeCard'
import { Link } from "react-router-dom";

const Pagination = ({itemsPerPage, showing}) => {
    const cards = useRef()
    let pokemons = useSelector(store => store.filteredAPI)
    let pokemonsLocal = useSelector(store => store.filteredLocal)
    const lang = useSelector(store => store.lang);
    let empty = false;

    const pageNumbers = [];
    const [currentPage, setCurrentPage] = useState(1);

    const lastItem = currentPage * itemsPerPage;
    const firstItem = lastItem - itemsPerPage;
    let currentItems = null
    const navigate = (number) => {
        setCurrentPage(number);
        cards.current.scrollTo(0,0)
    }

    if(showing === 'fromAPI'){
        if (pokemons.length === 0) {
            empty = true
        } else {
            for (let i = 1; i <= Math.ceil(pokemons.length / itemsPerPage); i++) {
                pageNumbers.push(i);
            }
            currentItems = pokemons.slice(firstItem, lastItem);
        }

    }
    if(showing === 'Local'){
        if (pokemonsLocal.length === 0) {
            empty = true
        } else {
            for (let i = 1; i <= Math.ceil(pokemonsLocal.length / itemsPerPage); i++) {
                pageNumbers.push(i);
            }
            currentItems = pokemonsLocal.slice(firstItem, lastItem);
        }
    }


    useEffect(() => {
        setCurrentPage(1)
        cards.current.scrollTo(0,0)
    }, [pokemons])

    return (
        <div className={s.pagination}>
            <div className={`${s.itemsHolder} custom-scrollbar`} ref={cards}>
                {!empty ?
                    currentItems.map(pokemon => <PokeCard key={pokemon.id} pokemon={pokemon}/>)
                 : (
                     <div className={s.empty}>
                         <div className={s.centered}>
                                <h2>{lang === 'en' ? "We couldn't catch any pokémons here" : 'No pudimos atrapar pokémones aquí'}</h2>
                                <h3>
                                    {lang === 'en' ? "Do you want to create one?" : "¿Quieres crear uno?"}
                                </h3>
                                <div className={s.createPokemon}>
                                    <Link to='/home/create' >
                                        <button className={s.link_button}>
                                            <span>
                                                {lang === 'en' ? 'Create' : 'Crear'}
                                            </span>
                                        </button>
                                    </Link>
                                </div>
                         </div>
                     </div>
                 )} 
            </div>
            <nav>
                <div className ={s.bar}>
                    {pageNumbers.map(number => (
                        <button key={number} className={`${s.buttonItem} ${number===currentPage? s.activeItem : ''}`} onClick={() => {navigate(number)}}>
                            <span>{number}</span>
                        </button>
                    ))}
                </div>
            </nav>
        </div>
    )
}

export default Pagination

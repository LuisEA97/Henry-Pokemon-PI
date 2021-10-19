import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import s from './styles/Pagination.module.css'
import PokeCard from '../pokeCard/pokeCard'

const Pagination = ({itemsPerPage, showing}) => {
    let pokemons = useSelector(store => store.filteredAPI)
    let pokemonsLocal = useSelector(store => store.filteredLocal)
    const lang = useSelector(store => store.lang);
    let empty = false;

    const pageNumbers = [];
    const [currentPage, setCurrentPage] = useState(1);

    const lastItem = currentPage * itemsPerPage;
    const firstItem = lastItem - itemsPerPage;
    let currentItems = null
    const navigate = (number) => setCurrentPage(number)

    if(showing === 'fromAPI'){
        if(pokemons.length === 0) empty = true
        for (let i = 1; i <= Math.ceil(pokemons.length / itemsPerPage); i++) {
            pageNumbers.push(i);        
        }
        currentItems = pokemons.slice(firstItem, lastItem);
    }
    if(showing === 'Local'){
        if(pokemonsLocal.length === 0) empty = true
        for (let i = 1; i <= Math.ceil(pokemonsLocal.length / itemsPerPage); i++) {
            pageNumbers.push(i);        
        }
        currentItems = pokemonsLocal.slice(firstItem, lastItem);
    }


    useEffect(() => {
        setCurrentPage(1)
    }, [pokemons])

    return (
        <div className={s.pagination}>
            <div className={`${s.itemsHolder} custom-scrollbar`}>
                {!empty ?
                    currentItems.map(pokemon => <PokeCard key={pokemon.id} pokemon={pokemon}/>)
                 : (
                     <div className={s.empty}>
                         <div className={s.centered}>
                         <h2>{lang === 'en' ? 'Nothing to see here...' : 'No hay resultados...'}</h2>
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
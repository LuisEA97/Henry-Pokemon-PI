import React, { useState } from 'react';
import s from './styles/Pagination.module.css'
import PokeCard from '../pokeCard/pokeCard'

const Pagination = ({itemsPerPage, items}) => {
    const pageNumbers = [];
    const [currentPage, setCurrentPage] = useState(1);

    for (let i = 1; i <= Math.ceil(items.length / itemsPerPage); i++) {
        pageNumbers.push(i);        
    }

    const lastItem = currentPage * itemsPerPage;
    const firstItem = lastItem - itemsPerPage;
    const currentItems = items.slice(firstItem, lastItem);
    const navigate = (number) => setCurrentPage(number)

    return (
        <div className={s.pagination}>
            <div className={`${s.itemsHolder} custom-scrollbar`}>
                {
                    currentItems.map(pokemon => <PokeCard key={pokemon.id} pokemon={pokemon}/>)
                } 
            </div>
            <nav>
                <ul className ={s.bar}>
                    {pageNumbers.map(number => (
                        <li key={number} className={`${s.buttonItem} ${number===currentPage? s.activeItem : ''}`} onClick={() => {navigate(number)}}>
                            <span>{number}</span>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}

export default Pagination

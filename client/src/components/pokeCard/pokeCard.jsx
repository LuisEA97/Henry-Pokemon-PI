import React from 'react'
import s from './styles/pokeCard.module.css' 
import { pokemonTypeClass as typeClass } from '../pokemonTypeClass';
import { useSelector} from 'react-redux';

const PokeCard = ({pokemon}) => {
    const bgCard = typeClass(pokemon.types[0].en).cardBg
    const lang = useSelector(store => store.lang);
    return (
        <div key={pokemon.id} className={`${s.card} shadow-medium ${bgCard}`}>
            <div className={s.imageContainer}>
                <img draggable="false" src={pokemon.img} alt={`${pokemon.name}_pic`} />
            </div>
            <h2 className={`${s.name} consola`}>{pokemon.name}</h2>
            <div className={s.pillsHolder}>
                {
                    pokemon.types.map(type => (
                        <div className={`${s.pill} shadow-small ${typeClass(type.en).pill}`}>
                            <span>{lang=== 'es'?(type.es):(type.en)}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default PokeCard

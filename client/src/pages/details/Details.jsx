import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { findPokemonById, setNavbarBg } from "../../redux/actions/actions";
import s from './styles/Details.module.css'
import axios from "axios";
import { pokemonTypeClass as typeClass } from "../../components/pokemonTypeClass";
import ProgressBar from "../../components/progressBar/ProgressBar";
import pokeball from '../../img/pokeball_lg.png'
import questionMark from '../../img/question mark.png'
import { Link } from "react-router-dom";


const Details = ({ id }) => {
    const [errorLoadImg, setErrorLoadImg] = useState(false)
    const lang = useSelector((store) => store.lang);
    const [errorLoad, setErrorLoad] = useState(false)
    const reduxData = useSelector(store => store.pokeById)
    const [loading, setLoading] = useState(true)
    const [background, setBackground] = useState('')
    const [pokemon, setPokemon] = useState(null)
    const dispatch = useDispatch()

    const capitalize = (word) => {
        return word[0].toUpperCase() + word.slice(1).toLowerCase();
    }
    const height = (h) => {
        let result = h / 10;
        if (result < 1) {
            result = result * 100
            return `${result} cm`;
        }
        return `${result} m`;
    }

    const weight = (w) => {
        let result = w / 10;
        if (result < 1) {
            result = result * 100;
            return `${result} gr.`
        }
        return `${result} kg`;
    }
    useEffect(() => {
        dispatch(setNavbarBg('#1E3A8A'))
        if (!pokemon) {
            if (reduxData && id === reduxData.id) {
                setPokemon(reduxData)
                setBackground(typeClass(reduxData.types[0].en).pageBg)
                dispatch(setNavbarBg(typeClass(reduxData.types[0].en).fillNav))
                setLoading(false)
            } else {
                setLoading(true)
                axios.get(`http://localhost:3001/pokemons/${id}`)
                    .then(response => {
                        setPokemon(response.data)
                        dispatch(findPokemonById(response.data))
                        const color = typeClass(response.data.types[0].en).pageBg;
                        const nb = typeClass(response.data.types[0].en).fillNav
                        console.log(color);
                        setBackground(color)
                        dispatch(setNavbarBg(nb))
                        setLoading(false)
                    })
                    .catch((e) => {
                        console.log(e);
                        setErrorLoad(true)
                    })
            }
        }
    }, [])

    if (errorLoad) {
        dispatch(setNavbarBg('#e45b56'))
        return (
            <div className={s.error_container}>
                <img src={questionMark}
                    draggable="false" alt="error" className={s.image_errorLoad} width="200px" />
                <h2>
                    {
                        lang === 'en' ? "We couldn't find this pokémon :(" : 'No pudimos encontrar este pokémon :('
                    }
                </h2>
                <div className={s.go_home}>
                    <Link to='/home' >
                        <button className={s.link_button}>
                            <span>
                                {lang === 'en' ? 'Go home' : 'Volver a inicio'}
                            </span>
                        </button>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        loading ? (
            <div className={s.loadingBg}>
                <img className='spinning' src={pokeball} alt="pokeball" width='120px' />
                <div className={s.loadingMsg}>
                    <h2>
                        {lang === 'en' ? 'Loading pokemon...' : 'Cargando pokémon...'}
                    </h2>
                </div>
            </div>
        ) : (
            <div className={`${s.pokemonPage} ${background}`}>
                <div className={s.container}>
                    {
                        !errorLoadImg ? (
                            <img onError={() => { setErrorLoadImg(true) }}
                                draggable="false" className={s.image} src={pokemon.img} width="290px" alt={pokemon.name} />
                        ) : (
                            <img src={questionMark}
                                draggable="false" alt="error" className={s.image} width="250px" />
                            )
                        }
                    <div className={s.titleHolder}>
                        <h2 className={s.title}>
                            {pokemon.name}
                        </h2>
                    </div>
                    <div className={` lato ${s.measurements}`}>
                        <div className={s.m_size}>
                            <h3 className={s.m_title}>
                                {lang === 'en' ? 'Weight: ' : 'Peso: '}
                            </h3>
                            <span className={s.m_detail}>
                                {weight(pokemon.weight)}
                            </span>
                        </div>
                        <div className={s.m_size}>
                            <h3 className={s.m_title}>
                                {lang === 'en' ? 'Height: ' : 'Altura: '}
                            </h3>
                            <span className={s.m_detail}>
                                {height(pokemon.height)}
                            </span>
                        </div>
                    </div>
                    <div className={s.typesHolder}>
                        {pokemon.types.map((type) => (
                            <div key={type.en} className={`${s.pill} shadow-small ${typeClass(type.en).pill}`}>
                                <span>{lang === "es" ? type.es : type.en}</span>
                            </div>
                        ))}
                    </div>
                    <div className={s.stats}>
                        <div className={s.statsTitle}>
                            <h3>{lang === 'en' ? `${capitalize(pokemon.name)}'s stats` : `Estadísticas de ${capitalize(pokemon.name)}`}</h3>
                        </div>
                        <div className={s.describeStat}>
                            <div className={s.statName}>
                                <h3>HP</h3>
                            </div>
                            <div className={s.statValue}>
                                <h3>{pokemon.hp}</h3>
                            </div>
                            <div className={s.progressStat}>
                                <ProgressBar start={pokemon.hp} end={256} width='full' />
                            </div>
                        </div>
                        <div className={s.describeStat}>
                            <div className={s.statName}>
                                <h3>
                                    {lang === 'en' ? 'Attack' : 'Ataque'}
                                </h3>
                            </div>
                            <div className={s.statValue}>
                                <h3>{pokemon.attack}</h3>
                            </div>
                            <div className={s.progressStat}>
                                <ProgressBar start={pokemon.attack} end={256} width='full' />
                            </div>
                        </div>
                        <div className={s.describeStat}>
                            <div className={s.statName}>
                                <h3>
                                    {lang === 'en' ? 'Defense' : 'Defensa'}
                                </h3>
                            </div>
                            <div className={s.statValue}>
                                <h3>{pokemon.defense}</h3>
                            </div>
                            <div className={s.progressStat}>
                                <ProgressBar start={pokemon.defense} end={256} width='full' />
                            </div>
                        </div>
                        <div className={s.describeStat}>
                            <div className={s.statName}>
                                <h3>
                                    {lang === 'en' ? 'Special attack' : 'Ataque especial'}
                                </h3>
                            </div>
                            <div className={s.statValue}>
                                <h3>{pokemon.special_attack}</h3>
                            </div>
                            <div className={s.progressStat}>
                                <ProgressBar start={pokemon.special_attack} end={256} width='full' />
                            </div>
                        </div>
                        <div className={s.describeStat}>
                            <div className={s.statName}>
                                <h3>
                                    {lang === 'en' ? 'Special Defense' : 'Defensa especial'}
                                </h3>
                            </div>
                            <div className={s.statValue}>
                                <h3>{pokemon.special_defense}</h3>
                            </div>
                            <div className={s.progressStat}>
                                <ProgressBar start={pokemon.special_defense} end={256} width='full' />
                            </div>
                        </div>
                        <div className={s.describeStat}>
                            <div className={s.statName}>
                                <h3>
                                    {lang === 'en' ? 'Speed' : 'Velocidad'}
                                </h3>
                            </div>
                            <div className={s.statValue}>
                                <h3>{pokemon.speed}</h3>
                            </div>
                            <div className={s.progressStat}>
                                <ProgressBar start={pokemon.speed} end={256} width='full' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    )
};

export default Details;

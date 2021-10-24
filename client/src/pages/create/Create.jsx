import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { getPokemonTypes, setNavbarBg } from "../../redux/actions/actions";
import axios from "axios";
import s from './styles/Create.module.css'
import Tooltip from '../../components/tooltip/Tooltip';

const Create = () => {
    const dispatch = useDispatch();
    const lang = useSelector((store) => store.lang);
    const typesOfPokemons = useSelector((store) => store.types);
    const [newPokemon, setNewPokemon] = useState({
        name: '',
        img: '',
        weight: '',
        height: '',
        hp: '',
        attack: '',
        defense: '',
        special_attack: '',
        special_defense: '',
        speed: '',
        types: []
    })
    const typesList = typesOfPokemons
        .filter((el) => {
            if (el.id !== 19) return el;
        })
        .sort(function (a, b) {
            if (lang === "es") {
                if (a.es < b.es) {
                    return -1;
                }
                if (a.es > b.es) {
                    return 1;
                }
                return 0;
            }
            if (lang === "en") {
                if (a.en < b.en) {
                    return -1;
                }
                if (a.en > b.en) {
                    return 1;
                }
                return 0;
            }
        });

    const isChecked = (e) => {
        if (e.target.checked) return true
        else return false
    }
    const split = (array = [], itemsPerGroup) => {
        let results = []
        let partial = []
        let el

        while (array.length > 0) {
            if (partial.length === itemsPerGroup) {
                results.push(partial)
                partial = []
            }
            el = array.shift()
            partial.push(el)

            if (array.length === 0) results.push(partial)
        }
        return results
    }
    const handleTypes = (e) => {

    }
    useEffect(() => {
        axios
            .get("http://localhost:3001/types")
            .then((response) => {
                dispatch(getPokemonTypes(response.data));
            })
        dispatch(setNavbarBg('#01264B'))
    }, [])
    return (
        <div className={s.createPage}>
            <h2 className={s.title}>
                {
                    lang === 'en' ? "Create your own Pokémon!" : "¡Crea tu propio Pokémon!"
                }
            </h2>
            <div className={s.spaceForm}>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                    }}
                    className={s.formCreate}
                >
                    <div className={s.form_row}>
                        <label className={`${s.input} ${s.name_input}`}>
                            <label htmlFor="pokemon-name">
                                {
                                    lang === 'en' ? "Your Pokémon's name:" : 'Nombre de tu Pokémon:'
                                }
                            </label>
                            <input
                                type="text"
                                id="pokemon-name"
                                name="name"
                                placeholder={lang === 'en' ? 'Give it a cool name' : 'Escribe un nombre creativo'} />
                        </label>
                        <label className={`${s.input} ${s.url_input}`}>
                            <label htmlFor="pokemon-img">
                                {
                                    lang === 'en' ? "Your Pokémon's image link" : 'Link de una imagen de tu pokémon'
                                }
                            </label>
                            <input type="text"
                                placeholder={lang === 'en' ? 'Type a valid URL' : 'Escribe una URL válida'}
                                id="pokemon-img"
                                name="img" />
                        </label>
                    </div>

                    <div className={s.types_title}>
                        <h3>
                            {lang === 'en' ? 'Choose up to 2 types:' : 'Selecciona hasta 2 tipos:'}
                        </h3>
                    </div>
                    <div className={s.pokemon_types_div}>
                        {split(typesList, 7).map((subArray, index) => {
                            return (
                                <div key={index} className={`${s.form_row} ${s.row_types}`}>
                                    {
                                        subArray.map(el => (
                                            <label key={el.id} className={s.type_option}>
                                                <input type="checkbox" name={el.id}
                                                    id={el.id}
                                                    onChange={handleTypes}
                                                    value={el.id}
                                                    disabled={newPokemon.types.length === 2 ? 'disabled' : null}
                                                />
                                                <span className={s.custom_check}></span>
                                                <span className={s.typeText}>{el[lang]}</span>
                                            </label>
                                        ))
                                    }
                                </div>
                            )
                        })}
                    </div>

                    <div className={s.form_row}>
                        <label className={`${s.input} ${s.number_input}`}>
                            <label htmlFor="pokemon-height">
                                {
                                    lang === 'en' ? "Height" : 'Altura'
                                }
                            </label>
                            <div>
                                <input type="number" min='1' id="pokemon-height" name="height"
                                    placeholder="1 dm."
                                />
                                <button className={s.help_button}>
                                    <Tooltip width='210px' text={lang === 'en' ? 'Set height in decimeters (1 dm = 10 cm)' : 'Ingresa la altura en decímetros (1 dm = 10 cm)'}>
                                        <span>?</span>
                                    </Tooltip>
                                </button>

                            </div>
                        </label>

                        <label className={`${s.input} ${s.number_input}`}>
                            <label htmlFor="pokemon-weight">
                                {
                                    lang === 'en' ? "Weight" : 'Peso'
                                }
                            </label>
                            <div>
                                <input type="number" id="pokemon-weight" name="weight"
                                    placeholder="1 hg."
                                />
                                <button className={s.help_button}>
                                    <Tooltip width='210px' text={lang === 'en' ? 'Set weight in hectograms (1 hg. = 100 gr.)' : 'Ingresa la altura en hectógramos (1 hg = 100 gr.)'}>
                                        <span>?</span>
                                    </Tooltip>
                                </button>
                            </div>
                        </label>

                        <label className={`${s.input} ${s.number_input}`}>
                            <label htmlFor="pokemon-hp">
                                {
                                    lang === 'en' ? "Health Points" : 'Puntos de Salud (HP)'
                                }
                            </label>
                            <input type="number" id="pokemon-hp" name="hp" placeholder="1-256" />
                        </label>

                        <label className={`${s.input} ${s.number_input}`}>
                            <label htmlFor="pokemon-attack">
                                {
                                    lang === 'en' ? "Attack" : 'Ataque'
                                }
                            </label>
                            <input type="number" id="pokemon-attack" name="attack" placeholder="1-256" />
                        </label>

                        <label className={`${s.input} ${s.number_input}`}>
                            <label htmlFor="pokemon-sp_attack">
                                {
                                    lang === 'en' ? "Sepecial Attack" : 'Ataque especial'
                                }
                            </label>
                            <input type="number" id="pokemon-sp_attack" name="special_attack" placeholder="1-256" />
                        </label>

                    </div>

                    <div className={s.form_row}>


                    </div>
                    <div className={s.form_row}>
                        <label className={`${s.input} ${s.number_input}`}>
                            <label htmlFor="pokemon-speed">
                                {
                                    lang === 'en' ? "Speed" : 'Velocidad'
                                }
                            </label>
                            <input type="number" id="pokemon-speed" name="speed" placeholder="1-256" />
                        </label>
                        <label className={`${s.input} ${s.number_input}`}>
                            <label htmlFor="pokemon-defense">
                                {
                                    lang === 'en' ? "Defense" : 'Defensa'
                                }
                            </label>
                            <input type="number" id="pokemon-defense" name="defense" placeholder="1-256" />
                        </label>
                        <label className={`${s.input} ${s.number_input}`}>
                            <label htmlFor="pokemon-sp_defense">
                                {
                                    lang === 'en' ? "Sepecial Defense" : 'Defensa especial'
                                }
                            </label>
                            <input type="number" id="pokemon-sp_defense" name="special_defense" placeholder="1-256" />
                        </label>
                        <div className={s.submit_holder}>
                            <button className={s.submit_button} type="submit">
                                <span>
                                    {lang === 'en' ? 'Create my Pokémon!' : '¡Crea mi Pokémon!'}
                                </span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Create

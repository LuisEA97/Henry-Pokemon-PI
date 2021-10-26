import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { getPokemonTypes, setNavbarBg, addNewPokemon } from "../../redux/actions/actions";
import axios from "axios";
import s from './styles/Create.module.css'
import Tooltip from '../../components/tooltip/Tooltip';
import { useHistory } from "react-router-dom";

const Create = () => {
    const history = useHistory()
    const submitBtn = useRef()
    const dispatch = useDispatch();
    const [countDown, setCountDown] = useState(5)
    const [errorForm, setErrorForm] = useState({
        name: '',
        url: ''
    })
    const temp = () => {
        setCountDown(countDown - 1)
    }
    const lang = useSelector((store) => store.lang);
    const [disabledBtn, setDisabledBtn] = useState(true)
    const typesOfPokemons = useSelector((store) => store.types);
    const [created, setCreated] = useState(false)
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

    const handleChangeInput = (e) => {
        let value = e.target.value

        if (e.target.type === 'url') {
            let testUrl = /^(?:(?<scheme>[^:\/?#]+):)?(?:\/\/(?<authority>[^\/?#]*))?(?<path>[^?#]*\/)?(?<file>[^?#]*\.(?<extension>[Jj][Pp][Ee]?[Gg]|[Pp][Nn][Gg]|[Gg][Ii][Ff]|[Ww][Ee][Bb][Pp]))(?:\?(?<query>[^#]*))?(?:#(?<fragment>.*))?$/gm

            if (!testUrl.test(value)) {
                setErrorForm({
                    ...errorForm,
                    url: {
                        en: 'Please type a valid URL',
                        es: 'Escribe una URL válida'
                    }
                })
            }
            else {
                setErrorForm({
                    ...errorForm,
                    url: {
                        en: '',
                        es: ''
                    }
                })
            }
        }
        if (e.target.name === 'name') {
            if (value === '') {
                setErrorForm({
                    ...errorForm,
                    name: {
                        en: 'Please add a name',
                        es: 'Por favor, escribe un nombre'
                    }
                })
            } else {
                setErrorForm({
                    ...errorForm,
                    name: {
                        en: '',
                        es: ''
                    }
                })
            }
        }
        if (e.target.type === 'number') {
            value = Number(value.replace(/\D/g, ''))
            if (value > 255) value = 255
        }
        if (e.target.type === 'text') value = value.toLowerCase()
        setNewPokemon({
            ...newPokemon,
            [e.target.name]: value
        })
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
    const handleTypes = (id) => {
        if (newPokemon.types.indexOf(id) !== -1) {
            setNewPokemon({
                ...newPokemon,
                types: newPokemon.types.filter(el => el !== id)
            })
        } else {
            setNewPokemon({
                ...newPokemon,
                types: [...newPokemon.types, id]
            })
        }
    }
    function isInputNumber(e) {
        let ch = String.fromCharCode(e.which);
        if (!(/[0-9]/.test(ch))) {
            e.preventDefault();
        }
    }
    async function handleSubmit(e) {
        e.preventDefault();
        if (!Object.values(newPokemon).some(e => e == false) && newPokemon.types.length) {
            axios.post('http://localhost:3001/pokemons', newPokemon)
                .then(response => {
                    console.log(response.data);
                    dispatch(addNewPokemon(response.data))
                    setNewPokemon({
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
                    setCreated(true)
                    setInterval(() => {
                        setCountDown(countDown => countDown - 1)
                    }, 1000)
                })
                .catch(e => console.log(e))
        }
    }
    useEffect(() => {
        axios
            .get("http://localhost:3001/types")
            .then((response) => {
                dispatch(getPokemonTypes(response.data));
            })
        dispatch(setNavbarBg('#01264B'))
    }, [])

    useEffect(() => {

        if (Object.values(newPokemon).some(e => e == false) || Object.values(errorForm).some(e => e.length > 0) || !newPokemon.types.length) {
            setDisabledBtn(true)
        }
        else {
            setDisabledBtn(false)
        }
    }, [newPokemon])

    useEffect(() => {
        if (countDown < 0) {
            history.push('/home')
        }
    }, [countDown])

    if (created) {
        return (
            <div className={s.createPage}>
                <div className={s.full}>
                    <h3 className={s.created_title}>
                        {
                            lang === 'en' ? 'Pokémon successfully created!' : '¡Pokémon creado con éxito!'
                        }
                    </h3>
                    <div className={s.message}>
                        <div className={s.countdown}>
                            <div className={s.countdown_number}>
                                <span className={s.counter}>{countDown}</span>
                            </div>
                            <svg className={s.svg}>
                                <circle className={s.circle} r="18" cx="20" cy="20"></circle>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={s.createPage}>
            <h2 className={s.title}>
                {
                    lang === 'en' ? "Create your own Pokémon!" : "¡Crea tu propio Pokémon!"
                }
            </h2>
            <div className={s.spaceForm}>
                <form
                    onSubmit={handleSubmit}

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
                                onChange={handleChangeInput}
                                type="text"
                                id="pokemon-name"
                                name="name"
                                value={newPokemon.name}
                                placeholder={lang === 'en' ? 'Choose a cool name' : 'Escribe un nombre creativo'} />
                            <span className={s.errorForm}>{errorForm.name[lang]}</span>
                        </label>
                        <label className={`${s.input} ${s.url_input}`}>
                            <label htmlFor="pokemon-img">
                                {
                                    lang === 'en' ? "Your Pokémon's image link" : 'Link de una imagen de tu pokémon'
                                }
                            </label>
                            <input
                                type="url"
                                onChange={handleChangeInput}
                                placeholder={lang === 'en' ? 'Type a valid URL' : 'Escribe una URL válida'}
                                id="pokemon-img"
                                value={newPokemon.img}
                                name="img" />
                            <span className={s.errorForm}>{errorForm.url[lang]}</span>
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
                                                    onChange={() => handleTypes(el.id)}
                                                    value={el.id}
                                                    checked={newPokemon.types.includes(el.id)}
                                                    disabled={!newPokemon.types.includes(el.id) && newPokemon.types.length === 2}
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
                                <input
                                    onChange={handleChangeInput}
                                    type="number"
                                    min='1'
                                    onKeyPressCapture={isInputNumber}
                                    id="pokemon-height"
                                    name="height"
                                    placeholder="1 dm."
                                    value={newPokemon.height}
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
                                <input
                                    onChange={handleChangeInput}
                                    type="number"
                                    min='1' onKeyPressCapture={isInputNumber}
                                    id="pokemon-weight"
                                    name="weight"
                                    value={newPokemon.weight}
                                    placeholder="1 hg."
                                />
                                <button className={s.help_button}>
                                    <Tooltip width='210px' text={lang === 'en' ? 'Set weight in hectograms (1 hg. = 0.1 Kg.)' : 'Ingresa la altura en hectógramos (1 hg = 0.1 Kg.)'}>
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
                            <input
                                onChange={handleChangeInput}
                                type="number"
                                min='1' onKeyPressCapture={isInputNumber}
                                id="pokemon-hp"
                                name="hp"
                                value={newPokemon.hp}
                                placeholder="1-255" />
                        </label>

                        <label className={`${s.input} ${s.number_input}`}>
                            <label htmlFor="pokemon-attack">
                                {
                                    lang === 'en' ? "Attack" : 'Ataque'
                                }
                            </label>
                            <input
                                onChange={handleChangeInput}
                                type="number"
                                min='1' onKeyPressCapture={isInputNumber}
                                id="pokemon-attack"
                                value={newPokemon.attack}
                                name="attack" placeholder="1-255" />
                        </label>

                        <label className={`${s.input} ${s.number_input}`}>
                            <label htmlFor="pokemon-sp_attack">
                                {
                                    lang === 'en' ? "Sepecial Attack" : 'Ataque especial'
                                }
                            </label>
                            <input

                                type="number"
                                min='1' onKeyPressCapture={isInputNumber}
                                id="pokemon-sp_attack"
                                name="special_attack"
                                onChange={handleChangeInput}
                                value={newPokemon.special_attack}
                                placeholder="1-255" />
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
                            <input type="number"
                                min='1'
                                onKeyPressCapture={isInputNumber}
                                onChange={handleChangeInput}
                                id="pokemon-speed"
                                name="speed"
                                value={newPokemon.speed}
                                placeholder="1-255" />
                        </label>
                        <label className={`${s.input} ${s.number_input}`}>
                            <label htmlFor="pokemon-defense">
                                {
                                    lang === 'en' ? "Defense" : 'Defensa'
                                }
                            </label>
                            <input
                                type="number"
                                min='1'
                                onKeyPressCapture={isInputNumber}
                                onChange={handleChangeInput}
                                id="pokemon-defense"
                                name="defense"
                                value={newPokemon.defense}
                                placeholder="1-255" />
                        </label>
                        <label className={`${s.input} ${s.number_input}`}>
                            <label htmlFor="pokemon-sp_defense">
                                {
                                    lang === 'en' ? "Sepecial Defense" : 'Defensa especial'
                                }
                            </label>
                            <input
                                type="number"
                                min='1'
                                onKeyPressCapture={isInputNumber}
                                onChange={handleChangeInput}
                                id="pokemon-sp_defense"
                                name="special_defense"
                                value={newPokemon.special_defense}
                                placeholder="1-255" />
                        </label>
                        <div className={s.submit_holder}>
                            <button ref={submitBtn} className={s.submit_button} disabled={disabledBtn} type="submit">
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

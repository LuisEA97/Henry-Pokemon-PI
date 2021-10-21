import React, { useState, useEffect } from 'react';
import s from './styles/root.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { setEn, setEs, listAllPokemons, getPokemonTypes } from '../../redux/actions/actions'
import logo from "../../img/logo.png";
import pokebola from "./img/pokebola.png";
import { Link } from "react-router-dom";
const axios = require("axios").default;

const Root = () => {
  const lang = useSelector((store) => store.lang);
  const [loading, setLoading] = useState(true);
  const [loadingTypes, setLoadingTypes] = useState(true);
  const [errorLoad, setErrorLoad] = useState(null);
  const [errorType, setErrorType] = useState(null);
  const pokemons = useSelector((store) => store.filtered);
  const localPokemons = useSelector((store) => store.localPokemons);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/pokemons`)
      .then((response) => {
        dispatch(listAllPokemons(response.data));
        setLoading(false);
      })
      .catch((e) => {
        setErrorLoad(e);
        console.log(e);
      });

    axios
      .get("http://localhost:3001/types")
      .then((response) => {
        dispatch(getPokemonTypes(response.data));
        setLoadingTypes(false);
      })
      .catch((e) => {
        setErrorType(e);
      });
  }, []);

  return (
    <div className={s.main}>
      <img draggable="false" src={logo} alt="logo" className={s.logo} />
      <h1 className={`${s.welcome} lato`}>
        {lang === "es" ? `¡Bienvenido!` : `Welcome!`}
      </h1>
      <div className={s.container}>
        <h2 className="consola">
          {lang === "es"
            ? `Selecciona un idioma:`
            : `Please, choose a language:`}
        </h2>
        <div className={s.btnHolder}>
          <button
            className={`${s.langBtn} ${
              lang === "en" ? `${s.selected}` : `${s.notSelected}`
            }`}
            onClick={() => dispatch(setEn())}
          >
            English
          </button>

          <button
            className={`${s.langBtn} ${
              lang === "es" ? `${s.selected}` : `${s.notSelected}`
            }`}
            onClick={() => dispatch(setEs())}
          >
            Español
          </button>
        </div>
        <div className={s.statusHolder}>
          {!errorLoad ? (
            loading ? (
              <div className={s.loadingPokemons}>
                <img
                  draggable="false"
                  src={pokebola}
                  alt="icon"
                  className={`${s.pokeball} spinning`}
                />
                <span className={`${s.loadingStatus}`}>
                  {lang === "es"
                    ? `Capturando pokemones...`
                    : `Catching pokemons...`}
                </span>
              </div>
            ) : (
              <div className={s.loadingPokemons}>
                <img
                  draggable="false"
                  src={pokebola}
                  alt="icon"
                  className={`${s.pokeballDone}`}
                />
                <span className={`${s.loadedStatus} consola`}>
                  {lang === "es"
                    ? `¡Pokemones capturados!`
                    : `Pokemons catched!`}
                </span>
              </div>
            )
          ) : (
            <div>
              <span className={`${s.errorStatus} consola`}>
                {lang === "en"
                  ? `We couldnt catch pokemons`
                  : `No pudimos atrapar los pokemones`}
              </span>
            </div>
          )}

          {!errorType ? (
            loadingTypes ? (
              <div className={s.loadingPokemons}>
                <img
                  draggable="false"
                  src={pokebola}
                  alt="icon"
                  className={`${s.pokeball} $spinning`}
                />
                <span className={`${s.loadingStatus}`}>
                  {lang === "es"
                    ? `Identificando tipos...`
                    : `Getting types...`}
                </span>
              </div>
            ) : (
              <div className={s.loadingPokemons}>
                <img
                  draggable="false"
                  src={pokebola}
                  alt="icon"
                  className={`${s.pokeballDone}`}
                />
                <span className={`${s.loadedStatus} consola`}>
                  {lang === "es"
                    ? `¡Pokemones identificados!`
                    : `Pokemons identified!`}
                </span>
              </div>
            )
          ) : (
            <div>
              <span className={`${s.errorStatus} consola`}>
                {lang === "en"
                  ? `We couldnt get pokemon types`
                  : `No pudimos obtener los tipos de pokemones`}
              </span>
            </div>
          )}

          {!loading && !loadingTypes ? (
            <Link to={"/home"}>
              <button className={`${s.langBtn} ${s.nextBtn}`}>
                <span>{lang === "es" ? `Continuar` : `Continue`}</span>
              </button>
            </Link>
          ) : (
            ""
          )}
          {errorLoad || errorType ? (
            <div>
              <button
                className={`${s.langBtn} ${s.errorBtn}`}
                onClick={() => {
                  window.location.reload();
                }}
              >
                <span>{lang === "es" ? `Intentar de nuevo` : `Try again`}</span>
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Root

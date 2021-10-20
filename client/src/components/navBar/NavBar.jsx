import React, { useState } from "react";
import s from "./styles/NavBar.module.css";
import logo from "../../img/logo.png";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  findPokemonByName,
  setEn,
  setEs,
  filterBy,
} from "../../redux/actions/actions";
import axios from "axios";
import { useHistory } from "react-router-dom";

const NavBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const color = useSelector((store) => store.navbarBg);
  const [searching, setSearching] = useState(false);
  const [showingResults, setShowingResults] = useState(false);
  const [searchPokemon, setsearchPokemon] = useState("");
  const lang = useSelector((store) => store.lang);
  const findPokemon = () => {
    if (searchPokemon !== "") {
      history.push("/home");
      setSearching(true);
      axios
        .get(
          "http://localhost:3001/pokemons?name=" + searchPokemon.toLowerCase()
        )
        .then((response) => {
          dispatch(findPokemonByName(response.data));
          setSearching(false);
          setShowingResults(true);
        })
        .catch((e) => {
          if (lang === "en") alert("We couldnt capture this pokemon!");
          if (lang === "es") alert("¡No pudimos capturar ese pokemón!");
          setsearchPokemon("");
          setSearching(false);
        });
    }
  };
  const resetSearch = () => {
    setsearchPokemon("");
    setSearching(false);
    setShowingResults(false);
    dispatch(
      filterBy({
        type: "no_filter",
        showing: "all",
      })
    );
  };

  return (
    <div style={{ backgroundColor: `${color}` }}>
      <nav nav className={s.nav} >
        <Link draggable="false" to="/home">
          <div className={s.logoContainer}>
            <img draggable="false" src={logo} alt="pokemon" />
          </div>
        </Link>
        <div className={s.options}>
          <div className={s.search}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                findPokemon();
              }}
            >
              <label htmlFor="" className={s.inputContainer}>
                <label
                  htmlFor="search_pokemon"
                  className={searching ? `${s.loadingSearch} ` : s.label}
                >
                  {""}
                </label>
                <input
                  autoComplete="off"
                  type="text"
                  name="search_pokemon"
                  id="search_pokemon"
                  style={{ paddingRight: showingResults ? "25px" : "0px" }}
                  className={s.inputSearch}
                  onChange={(e) => {
                    setsearchPokemon(e.target.value);
                  }}
                  value={searchPokemon}
                  placeholder={
                    lang === "en"
                      ? "Type something to search "
                      : "Escribe algo para buscar"
                  }
                />
                {showingResults ? (
                  <button
                    className={s.closeSearch}
                    onClick={() => {
                      resetSearch();
                    }}
                  >
                    .
                  </button>
                ) : (
                  ""
                )}
              </label>
              <button type="submit" className={`${s.button} ${s.searchBtn}`}>
                <span>{lang === "en" ? "Search" : "Buscar"}</span>
              </button>
            </form>
          </div>
          <div className={s.lang}>
            <button
              className={`${s.button} ${lang === "en" ? s.button_active : ""}`}
              onClick={() => dispatch(setEn())}
            >
              <span>EN</span>
            </button>
            <button
              className={`${s.button} ${lang === "es" ? s.button_active : ""}`}
              onClick={() => dispatch(setEs())}
            >
              <span>ES</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;

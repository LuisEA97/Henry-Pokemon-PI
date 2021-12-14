import React, { useState } from "react";
import s from "./styles/NavBar.module.css";
import logo from "../../img/logo.png";
import { BiSearch } from "react-icons/bi";
import { HiMenu } from "react-icons/hi";
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
  const [expanded, setExpanded] = useState(false)
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
          "/pokemons?name=" + searchPokemon.toLowerCase()
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
    <div className={`${s.nav_shadow} ${expanded ? s.expanded : s.notExpanded}`} style={{ backgroundColor: `${color}` }}>
      <nav className={`${s.nav}`} >
        <div className={s.menuBar}>
          <Link draggable="false" to="/home">
            <div className={s.logoContainer}>
              <img draggable="false" src={logo} alt="pokemon" />
            </div>
          </Link>
          <button
            onClick={() => { setExpanded((expanded) => !expanded) }}
            className={s.expandMenu}>
            <HiMenu />
          </button>
        </div>
        <div className={s.options}>
          <div className={`${s.lang} ${s.menuOption}`}>
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
          <div className={s.menuOption}>
            <form
              className={s.search}
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
                      ? "Search a pokemon"
                      : "Busca un pokémon"
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
                <span className={`${s.textSearch}`}>{lang === "en" ? "Search" : "Buscar"}</span>
                <BiSearch className={`${s.iconSearch}`} />
              </button>
            </form>
          </div>
          <div className={`${s.create} ${s.menuOption}`}>
            <Link to='/home/create'>
              <button className={`${s.link}`}>
                <span>
                  {lang === 'en' ? 'Create your own Pokémons!' : '¡Crea tus Pokémones!'}
                </span>
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;

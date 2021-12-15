import React, { useEffect } from "react";
import s from "./styles/Home.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Pagination from "../../components/pagination/Pagination";
import { setNavbarBg } from "../../redux/actions/actions";
import FilterBar from "../../components/filterBar/FilterBar";

const Home = () => {
  const dispatch = useDispatch();
  const lang = useSelector((store) => store.lang);
  const pokemons = useSelector((store) => store.pokemonsFromAPI);
  const localOrApi = useSelector((store) => store.localOrApi);

  const history = useHistory();

  useEffect(() => {
    if (lang === 'en') {
      document.title = "All pokémons"
    } else {
      document.title = "Todos los pokémones"
    }
    return () => {
      document.title = "PokéDex!"
    }
  }, [lang])

  useEffect(() => {
    window.addEventListener("load", function () {
      setTimeout(function () {
        // This hides the address bar:
        window.scrollTo(0, 1);
      }, 0);
    });
    if (pokemons.length === 0) {
      history.push("/");
    }
    dispatch(setNavbarBg("#080b14"));
  }, []);




  return (
    <div className={s.main}>
      <FilterBar />

      <div className={s.Cards}>
        {localOrApi === "API" ? (
          <Pagination itemsPerPage={12} showing="fromAPI" />
        ) : (
          ""
        )}
        {localOrApi === "LOCAL" ? (
          <Pagination itemsPerPage={12} showing="Local" />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Home;

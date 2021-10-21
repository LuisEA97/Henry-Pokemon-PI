import React, { useEffect, useState } from "react";
import s from "./styles/Home.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Pagination from "../../components/pagination/Pagination";
import { filterBy, setNavbarBg } from "../../redux/actions/actions";
import Dropdown from "../../components/dropdown/Dropdown";

const Home = () => {
  const dispatch = useDispatch();
  const lang = useSelector((store) => store.lang);
  const pokemons = useSelector((store) => store.pokemonsFromAPI);
  const typesOfPokemons = useSelector((store) => store.types);
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
  const [filters, setFilters] = useState({
    type: "no_filter",
    showing: "all",
  });

  const [localOrApi, setLocalOrApi] = useState("API");

  const history = useHistory();

  useEffect(() => {
    dispatch(filterBy(filters));
  }, [filters]);

  useEffect(() => {
    if (pokemons.length === 0) {
      history.push("/");
    }
    dispatch(setNavbarBg("#080b14"));
  }, []);

  const toggleApi = () => {
    setLocalOrApi("API");
  };
  const toggleLocal = () => {
    setLocalOrApi("Local");
  };

  const showBy = (el) => {
    const filter = {
      ...filters,
      showing: el.en,
    };
    setFilters(filter);
  };
  const orderBy = (el) => {
    const filter = {
      ...filters,
      type: el.id,
    };
    setFilters(filter);
  };
  const optionsFilters = [
    {
      id: "most_pw",
      en: "Most powerfull",
      es: "Más poderosos",
    },
    {
      id: "less_pw",
      en: "Less powerfull",
      es: "Menor poder",
    },
    {
      id: "name_asc",
      en: "By name (A-Z)",
      es: "Por nombre (A-Z)",
    },
    {
      id: "name_desc",
      en: "By name (Z-A)",
      es: "Por nombre (Z-A)",
    },
  ];
  return (
    <div className={s.main}>
      <div className={s.navigation}>
        <div className={s.navgroups}>
          <button
            onClick={() => {
              toggleApi();
            }}
            className={`${s.nav_button} ${localOrApi === "API" ? s.nav_active : s.nav_unactive
              }`}
          >
            <span>
              {lang === "en" ? "Worldwide pokemons" : "Pokemones del mundo"}
            </span>
          </button>
          <button
            onClick={() => {
              toggleLocal();
            }}
            className={`${s.nav_button} ${localOrApi === "Local" ? s.nav_active : s.nav_unactive
              }`}
          >
            <span>
              {lang === "en" ? "Local pokemons" : "Pokemones locales"}
            </span>
          </button>
        </div>
        <div className={s.filterHolder}>
          <div className={s.filters}>
            <div className="filter_group">
              <label htmlFor="type">
                {lang === "en" ? "Order by:" : "Ordenar por:"}
              </label>
              <Dropdown
                list={optionsFilters}
                lang={lang}
                message={lang === "en" ? "Not ordering" : "Sin ordenar"}
                cb={orderBy}
              />
            </div>
            <div className="filter_group">
              <label htmlFor="showing">
                {lang === "en" ? "Types of pokemons:" : "Tipos de pokemones:"}
              </label>
              <Dropdown
                list={typesList}
                lang={lang}
                message={lang === "en" ? "All pokemons" : "Todos los pokemones"}
                cb={showBy}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={s.Cards}>
        {localOrApi === "API" ? (
          <Pagination itemsPerPage={12} showing="fromAPI" />
        ) : (
          ""
        )}
        {localOrApi === "Local" ? (
          <Pagination itemsPerPage={12} showing="Local" />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Home;

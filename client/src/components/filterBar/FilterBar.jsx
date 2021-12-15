import React, { useEffect, useState } from 'react'
import s from './styles/filterBar.module.css'
import { useSelector, useDispatch } from "react-redux";
import { filterBy, filterApi, filterLocal } from '../../redux/actions/actions';
import Dropdown from "../../components/dropdown/Dropdown";
import { BsPlusLg } from "react-icons/bs";

const FilterBar = () => {
    const dispatch = useDispatch();
    const [expandFilters, setExpandFilters] = useState(false)
    const lang = useSelector((store) => store.lang);
    const localOrApi = useSelector((store) => store.localOrApi);
    const typesOfPokemons = useSelector((store) => store.types);

    const [filters, setFilters] = useState({
        type: "no_filter",
        showing: "all",
    });

    useEffect(() => {
        dispatch(filterBy(filters));
    }, [filters, dispatch]);

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
            return 0;
        });

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

    const orderBy = (el) => {
        const filter = {
            ...filters,
            type: el.id,
        };
        setFilters(filter);
    };

    const showBy = (el) => {
        const filter = {
            ...filters,
            showing: el.en,
        };
        setFilters(filter);
    };

    return (
        <div className={s.navigation}>
            <div className={s.navgroups}>
                <button
                    onClick={() => {
                        dispatch(filterApi())
                    }}
                    className={`${s.nav_button} ${localOrApi === "API" ? s.nav_active : s.nav_unactive
                        }`}
                >
                    <span>
                        {lang === "en" ? "Worldwide pokémons" : "Pokémones del mundo"}
                    </span>
                </button>
                <button
                    onClick={() => {
                        dispatch(filterLocal())
                    }}
                    className={`${s.nav_button} ${localOrApi === "LOCAL" ? s.nav_active : s.nav_unactive
                        }`}
                >
                    <span>
                        {lang === "en" ? "Local pokémons" : "Pokémones locales"}
                    </span>
                </button>
            </div>
            <div className={`${s.filterHolder} ${expandFilters ? s.expanded : s.notExpanded}`}>
                <div className={`${s.filterOptions}`}>
                    <span>Opciones de filtros</span>
                    <button
                        onClick={() => { setExpandFilters((expanded) => !expanded) }}
                        className={s.showHideFilter}>
                        <span>{expandFilters ? 'Ocultar' : 'Mostrar'}</span>
                        <span className={s.expandIcon}></span>
                    </button>
                </div>
                <div className={s.filters}>
                    <div className={`${s.filter_group}`}>
                        <label className={s.textDropdown} htmlFor="type">
                            {lang === "en" ? "Order by:" : "Ordenar por:"}
                        </label>
                        <Dropdown
                            list={optionsFilters}
                            lang={lang}
                            message={lang === "en" ? "Not ordering" : "Sin ordenar"}
                            cb={orderBy}
                        />
                    </div>
                    <div className={`${s.filter_group}`}>
                        <label className={s.textDropdown} htmlFor="showing">
                            {lang === "en" ? "Types of pokémons:" : "Tipos de pokémones:"}
                        </label>
                        <Dropdown
                            list={typesList}
                            lang={lang}
                            message={lang === "en" ? "All pokémons" : "Todos los pokémones"}
                            cb={showBy}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilterBar

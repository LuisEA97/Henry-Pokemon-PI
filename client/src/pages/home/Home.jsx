import React, { useEffect, useRef, useState } from 'react';
import s from './Home.module.css'
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom"
import Pagination from '../../components/pagination/Pagination';

const Home = () => {
    const lang = useSelector(store => store.lang);
    const pokemons = useSelector(store => store.pokemonsFromAPI)
    const typesOfPokemons = useSelector(store => store.types)
    const name_asc = useRef()
    const name_desc = useRef()
    const most_pw = useRef()
    const less_pw = useRef()
    const select = useRef()
    const [pokemonsToShow, setPokemonsToShow] = useState(pokemons)
    const [filters, setFilters] = useState({
        name_asc: false,
        name_desc: false,
        most_pw: false,
        less_pw: false
    })
    const history = useHistory()
    useEffect(() => {
        if(pokemons.length === 0){
            history.push('/')
        }
    }, [])
    
    const settingfilters = (e) => {
        const name = e.target.name;
        const value = e.target.checked;
        const filter = {}
        const controls = [
            name_asc,
            name_desc,
            most_pw,
            less_pw
        ]
        for(let i=0; i<controls.length; i++){
           const control = controls[i]
           if(control.current.name !== name){
               control.current.checked = false
               filter[control.current.name]=false
           }
        }
        filter[name] = value
        setFilters(filter)
    }
    const filtering = (e) => {
        settingfilters(e);
        const typeToFilter = select.current.value
        let results = []
        if(typeToFilter === 'all'){
            results = pokemonsToShow
        }
        if(filters.most_pw) {
            console.log('most powerfull')
            results = pokemonsToShow.sort((a, b) => a.attack - b.attack)
            setPokemonsToShow(results)
        }
        if(filters.less_pw) {
            console.log('less powerfull')
            results = pokemonsToShow.sort((a, b) => b.attack - a.attack)
            setPokemonsToShow(results)
        }
        if(filters.name_asc) {
            console.log('A-Z')
            results = pokemonsToShow.sort(function(a, b){
                if(a.name < b.name) { return 1; }
                if(a.name > b.name) { return -1; }
                return 0;
            })
            setPokemonsToShow(results)
        }
        if(filters.name_desc) {
            console.log('Z-A')
            results = pokemonsToShow.sort(function(a, b){
                if(a.name < b.name) { return -1; }
                if(a.name > b.name) { return 1; }
                return 0;
            })
            setPokemonsToShow(results)
        }
    }
    return (
        <div className={s.main}>
            <div className={s.filterHolder}>
                <h2>Ordenar por:</h2>
                <div className={s.filters}>
                    <div className="filter_group">
                        <input type="checkbox" name="most_pw" id="most_pw" ref={most_pw} onChange={filtering} />
                        <label htmlFor="most_pw">Mayor poder</label>
                    </div>
                    <div className="filter_group">
                        <input type="checkbox" name="less_pw" id="less_pw" ref={less_pw} onChange={filtering} />
                        <label htmlFor="less_pw">Menor poder</label>
                    </div>
                    <div className="filter_group">
                        <input type="checkbox" name="name_asc" id="name_asc" ref={name_asc} onChange={filtering} />
                        <label htmlFor="name_asc">De la A a la Z</label>
                    </div>
                    <div className="filter_group">
                        <input type="checkbox" name="name_desc" id="name_desc" ref={name_desc} onChange={filtering} />
                        <label htmlFor="name_desc">De la Z a la A</label>
                    </div>
                    <div className="filter_group">
                        <label htmlFor="typePokemon">Tipo</label>
                        <div className="selectdiv">
                            <label>
                                <select id="typesOfPokemons" defaultValue="all" ref={select} onChange={(e) => console.log(e.target.value)}>
                                    <option value="all"> {lang=== 'en' ? 'All' : 'Todos'} </option>
                                    {typesOfPokemons.map((pokeType) => {
                                    if(pokeType.id !== 19 && pokeType.id !== 20){
                                        return (
                                            <option key={pokeType.id} value={pokeType.en}>{lang=== 'en'?(pokeType.en):(pokeType.es)}</option>
                                            )
                                        }
                                    })}
                                </select>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div className={s.Cards}>
                <Pagination itemsPerPage={12} items={pokemonsToShow} />                
            </div>
        </div>
    )
}

export default Home

import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

const Create = () => {
    const lang = useSelector((store) => store.lang);
    return (
        <div>
            <h2>
                {
                    lang === 'en' ? 'Create your own Pokémon!' : '¡Crea tu propio Pokémon!'
                }
            </h2>
        </div>
    )
}

export default Create

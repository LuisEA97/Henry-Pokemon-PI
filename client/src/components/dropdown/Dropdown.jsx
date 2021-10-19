import React, { useEffect, useState, useRef } from 'react'
import s from './styles/Dropdown.module.css'

const Dropdown = ({list, lang, message, cb}) => {
    const [active, setActive] = useState(false)
    const [selected, setSelected] = useState('')
    useEffect(() => {
        console.log(active);
    }, [active])

    const isActive =()=>{
        setActive(!active)
    }
    const setOption = (input) => {
        setSelected(input)
        setActive(!active)
    }
    const clearSelection = () => {
        setSelected('')
        setActive(!active)
    }
    return (
        <div>
            <div className={s['select-box']}>
                    <div className={`${s['options-container']} ${ active ? `${s.active}` : ''}`}>
                    <div 
                    key={0} 
                    className={s.option} 
                    onClick={() => {
                        clearSelection()
                        cb({
                            id: 'no_filter',
                            en: 'all'
                        })
                    }
                    }>
                        <span>{message}</span>
                    </div>

                    {list.map(element => {
                        return(
                            <div key={element.en} className={s.option} onClick={() => {
                                setOption(element[lang]);
                                cb(element)
                                }}>
                                <span>{element[lang]}</span>
                            </div>
                        )
                    })}

                    </div>

                    <div onClick={() => {isActive()}} className={s.selected}>
                    {!selected ? message : selected}
                    </div>
                </div>
        </div>
    )
}

export default Dropdown
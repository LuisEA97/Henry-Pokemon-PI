import React, { useEffect, useState } from 'react'
import s from './styles/Dropdown.module.css'

const Dropdown = ({list, lang, message, cb}) => {
    const [active, setActive] = useState(false)
    const [selected, setSelected] = useState('')
  useEffect(() => {
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
      <>
        <div className={s["select-box"]}>
          <div
            className={`${s["options-container"]} ${
              active ? `${s.active}` : ""
            }`}
          >
            <div
              key={0}
              className={s.option}
              onClick={() => {
                clearSelection();
                cb({
                  id: "no_filter",
                  en: "all",
                });
              }}
            >
              <span>{message}</span>
            </div>

            {list.map((element) => {
              return (
                <div
                  key={element.en}
                  className={s.option}
                  onClick={() => {
                    setOption(element);
                    cb(element);
                  }}
                >
                  <span>{element[lang]}</span>
                </div>
              );
            })}
          </div>

          <div
            onClick={() => {
              isActive();
            }}
            className={s.selected}
          >
            {!selected ? message : selected[lang]}
          </div>
        </div>
      </>
    );
}

export default Dropdown

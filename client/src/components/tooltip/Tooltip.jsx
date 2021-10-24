import React from 'react'
import s from './styles/Tooltip.module.css'

const Tooltip = ({ children, text, width }) => {
    const [show, setShow] = React.useState(false);

    return (
        <div className={s.tooltip_container}>
            <div style={{ width: `${width}` }} className={show ? `${s.tooltip_box} ${s.visible}` : `${s.tooltip_box}`}>
                {text}
                <span className={s.tooltip_arrow} />
            </div>
            <div
                onMouseEnter={() => setShow(true)}
                onMouseLeave={() => setShow(false)}
            /* onClick={() => setShow(!show)} */
            >
                {children}
            </div>
        </div>
    );
}

export default Tooltip

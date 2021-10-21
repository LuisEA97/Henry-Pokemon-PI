import React from 'react'
import s from './styles/ProgressBar.module.css'

const ProgressBar = ({ start, end, width }) => {
    const calculateProgress = (start, end) => {
        const porcentaje = (end - start) / (end / 100)
        return porcentaje
    }
    const progressWidth = calculateProgress(start, end)
    return (
        <div style={{ maxWidth: width === 'full' ? '100%' : `${width}px` }} className={s.barContainer}>
            <div className={`${s.child} ${s.progressColor}`}></div>
            <div style={{ width: `${progressWidth}%` }} className={`${s.child} ${s.progressTracker}`}></div>

        </div >
    )
}

export default ProgressBar

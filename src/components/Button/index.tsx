import { Pause, Play, RefreshCcw } from 'lucide-react'
import css from './index.module.scss'

export const PauseButton = ({onClick, isActive}: {onClick: () => void, isActive: boolean}) => {
    return (
        <button onClick={onClick} className={css.button}>
            {isActive ? <Pause size={20} color={'#111B22'}/> : <Play size={20} color={"#111B22"} />}
        </button>
    )
}
export const ResetButton = ({onClick}: {onClick: () => void}) => {
    return (
        <button onClick={onClick} className={css.button}>
            <RefreshCcw size={20} color='#111B22'/>
        </button>
    )
}
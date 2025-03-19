import { Timer } from '../../components/Timer'
import css from './index.module.scss'
import Cat from '../../../public/Cat.png'
import { SetTaskMenu, MainMenu } from '../../components/TaskMenu'
import { useState } from 'react'

export const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className={css.content}>
      {' '}
      <button onClick={() => setIsOpen(!isOpen)}>Click to isOpen</button>
      <img src={Cat} alt="cat" style={{ width: '150px', height: '150px' }} />
      <h1>
        <Timer />
      </h1>
      <div className={css.taskMenuWrapper}>
        {isOpen ?<SetTaskMenu/> : (  <MainMenu />) }
        
      
      </div>
    </div>
  )
}

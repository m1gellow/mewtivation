import { Timer } from '../../components/Timer'
import css from './index.module.scss'
import Cat from '../../../public/Cat.png'
import { Menu } from '../../components/TaskMenu'
import { useEffect, useState } from 'react'
import { MainButton } from '../../components/Button'

export const HomePage = () => {
  const [showSetTaskMenu, setShowSetTaskMenu] = useState(false)
  const [showTaskMenu, setShowTaskMenu] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.altKey) {
        setShowSetTaskMenu((prev) => !prev)
      }
      if ((e.ctrlKey && e.key === 'x') || e.key === 'ч' || e.key === 'X' || e.key === 'Ч') {
        setShowTaskMenu((prev) => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div className={css.content}>
      <img src={Cat} alt="cat" style={{ width: '150px', height: '150px' }} />
      <h1>
        <Timer />
      </h1>
      <div className={css.taskMenuWrapper}>
        <Menu showTaskMenu={showTaskMenu} setShowSetTaskMenu={setShowSetTaskMenu} showSetTaskMenu={showSetTaskMenu} />
      </div>
      <MainButton type={'button'} onClick={() => setShowSetTaskMenu((prev) => !prev)}>
        Create
      </MainButton>
    </div>
  )
}

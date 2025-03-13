import { Outlet } from 'react-router-dom'
import css from './index.module.scss'

export const Layout = () => {
  return (
    <div className={css.layout}>
      <div className={css.content}>
        <Outlet />
      </div>
    </div>
  )
}

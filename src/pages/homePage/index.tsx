
import { Timer } from '../../components/Timer'
import css from './index.module.scss'
import Cat from '../../../public/Cat.png'

export const HomePage = () => {
  return (
    <div className={css.content}>
          <img src={Cat} alt='cat' style={{width: "150px", height: '150px'}}/>
      <h1>
        <Timer />
      </h1>
    </div>
  )
}

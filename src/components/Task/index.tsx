
import { ITrackerData } from '../../lib/types'
import { useSetTaskToActive } from '../../store/useTasksStore'
import css from './index.module.scss'
import cn from 'classnames'

export const TaskCard = ({ task }: { task: ITrackerData }) => {

  const setActive = () => {
    useSetTaskToActive(task.id)
    console.log(task.isActive)
  }

  return (
    <div className={cn({ [css.task]: true, [css.active]: task.isActive })} onClick={setActive}>
      <div className={css.taskCardElements}>
        <span>
          {' '}
          {task.time.hours} hr {task.time.minutes} min
        </span>
        <span> {task.name}</span>
        <div>BOX</div>
      </div>
    </div>
  )
}

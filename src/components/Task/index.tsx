import { Badge, BadgeCheck } from 'lucide-react'
import { ITrackerData } from '../../lib/types'
import { useSetDeleteTask, useSetTaskIsDone, useSetTaskToActive, useTask } from '../../store/useTasksStore'
import css from './index.module.scss'
import cn from 'classnames'
import { useEffect } from 'react'

export const TaskCard = ({ task }: { task: ITrackerData }) => {


  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newTasks: ITrackerData | undefined = useTask.getState().tasks.find((task) => task.isActive === true)
      if (e.key === 'Backspace') {
        useSetDeleteTask(newTasks?.id)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const setActive = () => {
    if (!task.isDone) {
      useSetTaskToActive(task.id)
    }
  }

  const handleDoneTask = () => {
    useSetTaskIsDone(task.id)
  }

  return (
    <div className={cn({ [css.task]: true, [css.active]: task.isActive, [css.done]: task.isDone })} onClick={setActive}>
      <div className={css.taskCardElements}>
        <span>
          {' '}
          {task.time.hours} hr {task.time.minutes} min
        </span>
        <span> {task.name}</span>
        <div onClick={handleDoneTask}>{task.isDone ? <BadgeCheck /> : <Badge />}</div>
      </div>
    </div>
  )
}

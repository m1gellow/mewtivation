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
        localStorage.setItem("autoSavedData", JSON.stringify([... useTask.getState().tasks.filter((task) => task.id !== newTasks?.id)]))
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const setActive = () => {
      useSetTaskToActive(task.id)
      localStorage.setItem("autoSavedData", JSON.stringify([...useTask.getState().tasks]))
  }

  const handleDoneTask = () => {
    useSetTaskIsDone(task.id)
    // more complex system to save data as done in storage
    const savedData: ITrackerData[] = JSON.parse(localStorage.getItem("autoSavedData")!)
    const newData = savedData.map((t) => {
      if(t.id === task.id){
        return {...t, isDone: t.isDone === false ? true : false}
      }else{
        return t
      }
    })
    localStorage.setItem("autoSavedData", JSON.stringify([...newData]))
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

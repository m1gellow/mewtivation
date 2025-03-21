import { FormEvent, useState } from 'react'
import css from './index.module.scss'
import { MainButton } from '../Button'
import { useSetTaskTime } from '../../store/useTimeTrackerStore'
import { TaskCard } from '../Task'
import { useSetTasks, useTask } from '../../store/useTasksStore'
import { ITrackerData } from '../../lib/types'
import { v4 as uuidv4 } from 'uuid'

export const Menu = ({
  showSetTaskMenu,
  showTaskMenu,
  setShowSetTaskMenu,
}: {
  showSetTaskMenu: boolean
  showTaskMenu: boolean
  setShowSetTaskMenu: (arg1: boolean) => void
}) => {
  const [value, setValue] = useState<ITrackerData>({
    id: '',
    name: '',
    time: {
      seconds: 0,
      hours: 0,
      minutes: 0,
    },
    isActive: false,
    isDone: false
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (value.name !== '') {
      setShowSetTaskMenu(false)
      useSetTasks({
        id: uuidv4(),
        name: value.name,
        time: {
          seconds: value.time.seconds,
          minutes: value.time.minutes,
          hours: value.time.hours,
        },
        isActive: false,
        isDone: false
      })
      // useSetTaskName(value.name)
      useSetTaskTime(value.time)
      setValue({
        id: '',
        name: '',
        time: {
          seconds: 0,
          hours: 0,
          minutes: 0,
        },
        isActive: true,
        isDone: false
      })
    }
  }

  if (showSetTaskMenu === true) {
    return (
      <div className={css.taskMenu}>
        <form onSubmit={handleSubmit} className={css.form}>
          <input
            type="text"
            name="name"
            placeholder="task name"
            onChange={(e) => setValue({ ...value, name: e.target.value })}
            value={value.name}
            className={css.input}
          />
          <div className={css.timeInputs}>
            <label htmlFor="hours">hr</label>
            <input
              type="text"
              name="hours"
              placeholder="task name"
              onChange={(e) => setValue({ ...value, time: { ...value.time, hours: Number(e.target.value) } })}
              value={value.time.hours}
              className={css.input}
            />
            <label htmlFor="minuts">min</label>
            <input
              type="text"
              name="minuts"
              placeholder="task name"
              onChange={(e) => setValue({ ...value, time: { ...value.time, minutes: Number(e.target.value) } })}
              value={value.time.minutes}
              className={css.input}
            />
            <label htmlFor="seconds">sec</label>
            <input
              type="text"
              name="seconds"
              placeholder="task name"
              onChange={(e) => setValue({ ...value, time: { ...value.time, seconds: Number(e.target.value) } })}
              value={value.time.seconds}
              className={css.input}
            />
          </div>
          <MainButton type={'submit'}>Add</MainButton>
        </form>
      </div>
    )
  } else if (showTaskMenu) {
    return <MainMenu />
  }
}

export const MainMenu = () => {
  const tasks = useTask((state) => state.tasks)
  const elementsAfterFirst = tasks.slice(1)
  return (
    <div className={css.MainTaskMenu}>
      {elementsAfterFirst.length > 0 ? (
        elementsAfterFirst.map((task) => <TaskCard key={task.id} task={task} />)
      ) : (
        <div>Dont have an y tasks yet</div>
      )}
    </div>
  )
}

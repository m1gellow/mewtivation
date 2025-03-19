import { FormEvent, useEffect, useState } from 'react'
import { TouchLine } from '../TouchLine'
import css from './index.module.scss'
import { MainButton } from '../Button'
import { useSetTaskName, useSetTaskTime } from '../../store/useTimeTrackerStore'
import { TaskCard } from '../Task'
import { useSetTasks, useTask } from '../../store/useTasksStore'
import { ITrackerData } from '../../lib/types'
import {v4 as uuidv4} from 'uuid'



export const SetTaskMenu = () => {
  const [isActive, setIsActive] = useState(true)
  const [value, setValue] = useState<ITrackerData>({
    id: '',
    name: '',
    time: {
      seconds: 0,
      hours: 0,
      minutes: 0,
    },
    isActive: false
  })

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.altKey) {
        setIsActive((prevValue) => !prevValue)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    useSetTasks(value)
    useSetTaskName(value.name)
    useSetTaskTime(value.time)
    setValue({
      id: uuidv4(),
      name: '',
      time: {
        seconds: 0,
        hours: 0,
        minutes: 0,
      },
      isActive: true
    })
    setIsActive(false)
  }

  if (isActive) {
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

        <div>
          <TouchLine setOpen={setIsActive} isOpen={isActive} />
        </div>
      </div>
    )
  } else {
    return (
      <div className={css.touchLine}>
        <TouchLine setOpen={setIsActive} isOpen={isActive} />
      </div>
    )
  }
}

export const MainMenu = () => {
  const tasks = useTask((state) => state.tasks)
  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.altKey) {
        setIsActive((prevValue) => !prevValue)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  if (isActive) {
    return (
      <div className={css.MainTaskMenu}>
        {tasks.map((task) => (
          <div key={task.name}>
            <TaskCard task={task} />
          </div>
        ))}
        <div>
          <TouchLine setOpen={setIsActive} isOpen={isActive} />
        </div>
      </div>
    )
  } else {
    return (
      <div className={css.touchLine}>
        <TouchLine setOpen={setIsActive} isOpen={isActive} />
      </div>
    )
  }
}

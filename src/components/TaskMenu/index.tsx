import { FormEvent, useEffect, useState } from 'react'
import css from './index.module.scss'
import { MainButton } from '../Button'
import { useSetTaskTime } from '../../store/useTimeTrackerStore'
import { TaskCard } from '../Task'
import { useSetTasks, useTask } from '../../store/useTasksStore'
import { ITrackerData } from '../../lib/types'
import { v4 as uuidv4 } from 'uuid'

export const Menu = () => {
  const [showSetTaskMenu, setShowSetTaskMenu] = useState(false)
  const [showTaskMenu, setShowTaskMenu] = useState(false)
  const [value, setValue] = useState<ITrackerData>({
    id: '',
    name: '',
    time: {
      seconds: 0,
      hours: 0,
      minutes: 0,
    },
    isActive: false,
    isDone: false,
  })

  useEffect(() => {
    // here we get data
    let autoSavedData: ITrackerData[] = JSON.parse(localStorage.getItem("autoSavedData")!)
    if(autoSavedData){
      autoSavedData.forEach((task) => useSetTasks(task))
    }
  }, [])

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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (value.name !== '') {
      setShowSetTaskMenu(false)

      const newValues = {
        id: uuidv4(),
        name: value.name,
        time: {
          seconds: value.time.seconds,
          minutes: value.time.minutes,
          hours: value.time.hours,
        },
        isActive: false,
        isDone: false,
      }
      useSetTasks(newValues)

      // here we get data
      let autoSavedData:ITrackerData[] = JSON.parse(localStorage.getItem("autoSavedData")!)

      if(autoSavedData){
        //here we set data
        localStorage.setItem("autoSavedData", JSON.stringify([...autoSavedData, newValues]))
       
        autoSavedData.forEach((task) => useSetTasks(task))
      }else{
        localStorage.setItem("autoSavedData", JSON.stringify([newValues]))
      }

      useSetTaskTime(value.time)
      setValue({
        id: '',
        name: '',
        time: {
          seconds: 0,
          hours: 0,
          minutes: 0,
        },
        isActive: false,
        isDone: false,
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
            autoFocus
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
  } else
    return (
      <MainButton type={'button'} onClick={() => setShowSetTaskMenu(true)}>
        Create
      </MainButton>
    )
}

export const MainMenu = () => {
  const tasks = useTask((state) => state.tasks)
  let elementsAfterFirst = tasks.slice(1)

  return (
    <div className={css.MainTaskMenu}>
      {elementsAfterFirst.length > 0 ? (
        elementsAfterFirst.map((task) => <TaskCard key={task.id} task={task} />)
      ) : (
        <div>Dont have any tasks yet</div>
      )}
    </div>
  )
}

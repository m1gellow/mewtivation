import { FormEvent, useState } from 'react'
import { TouchLine } from '../TouchLine'
import css from './index.module.scss'
import { MainButton } from '../Button'
import {setTaskName, setTaskTime} from '../../lib/store'


export interface ITrackerData{
  name: string,
  time:{
    seconds: number,
    hours: number,
    minutes: number,
  }
}

export const TaskMenu = () => {
  const [isActive, setIsActive] = useState(true)
  const [value, setValue] = useState<ITrackerData>({
    name: '',
    time: {
      seconds: 0,
      hours: 0,
      minutes: 0,
    },
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()


    setTaskName(value.name)
    setTaskTime(value.time)
    setValue({
      name: "",
      time: {
        seconds: 0,
      hours: 0,
      minutes: 0,
      }
    })
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

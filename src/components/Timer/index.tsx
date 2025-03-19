import { useEffect, useState } from 'react'
import css from './index.module.scss'
import { Progressbar } from '../Progressbar'
import { PauseButton, ResetButton } from '../Button'
import { TimeToSeconds } from '../../lib/timeToSeconds'
import { useTimeTracker } from '../../store/useTimeTrackerStore'
import { useTask } from '../../store/useTasksStore'

export type TTime = {
  hours: number | undefined
  minutes: number | undefined
  seconds: number | undefined
}

export const Timer = () => {
  const trackerTime = useTimeTracker((state) => state.data.time)
  const tasks = useTask((state) => state.tasks)
  const [time, setTime] = useState<TTime>({
    hours: trackerTime.hours,
    minutes: trackerTime.minutes,
    seconds: trackerTime.seconds,
  })
  const [isActive, setIsActive] = useState(false)
  const [totalTime, setTotalTime] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const activeTasks = tasks.find((task) => task.isActive === true)
    setTime({
      hours: activeTasks?.time.hours,
      minutes: activeTasks?.time.minutes,
      seconds: activeTasks?.time.seconds,
    })
    setTotalTime(TimeToSeconds(activeTasks?.time))
  }, [tasks])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
        setTotalTime(0)

        e.preventDefault()
      }
      if (e.key === 'Enter' && totalTime !== 0) {
        setIsActive((prev) => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  useEffect(() => {
    // Update totalTime whenever trackerTime changes
    setTotalTime(TimeToSeconds(trackerTime))
    setTime(trackerTime) // Update local time state as well
  }, [trackerTime])

  //for timer
  useEffect(() => {
    let interval: number | undefined

    if (isActive && totalTime > 0) {
      interval = setInterval(() => {
        setTotalTime((prevTime) => prevTime - 1)
      }, 1000)
      console.log(totalTime)
    } else if (!isActive && totalTime !== 0) {
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [isActive, totalTime])

  //For progress bar
  useEffect(() => {
    if (totalTime > 0) {
      const totalSeconds = TimeToSeconds(time)
      const currentProgress = ((totalSeconds - totalTime) / totalSeconds) * 100
      setProgress(currentProgress)
    } else {
      setProgress(100)
    }
  }, [totalTime, time])

  //for start button
  const handleStart = () => {
    if (!isActive && totalTime !== 0) {
      setIsActive(true)
    } else {
      setIsActive(false)
    }
  }

  //to make format time
  const formatTime = (time: number) => {
    return String(time).padStart(2, '0')
  }

  // to reset time to 00:00:00
  const resetTime = () => {
    setTime({ hours: 0, minutes: 0, seconds: 0 })
    setTotalTime(0)
  }

  //  const setTimer = ({hours, minutes, seconds}: TTime) => {
  //   const newTime = { hours, minutes, seconds };
  //   setTime(newTime);
  //   setTotalTime(TimeToSeconds(newTime));
  //  }

  return (
    <div className={css.timerWrapper}>
      <div className={css.timer}>
        <span>
          {' '}
          {formatTime(Math.floor(totalTime / 3600))}:{formatTime(Math.floor((totalTime % 3600) / 60))}:
          {formatTime(totalTime % 60)}
        </span>
      </div>{' '}
      <Progressbar progress={progress} />
      <div style={{ margin: '20px', display: 'flex', gap: '20px' }}>
        <PauseButton onClick={handleStart} isActive={isActive} />
        <ResetButton onClick={resetTime} />
      </div>
    </div>
  )
}

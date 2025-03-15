import { useEffect, useState } from 'react'
import css from './index.module.scss'
import { Progressbar } from '../Progressbar'
import { PauseButton, ResetButton } from '../Button'
import { TimeToSeconds } from '../../lib/timeToSeconds'

export type TTime = {
  hours: number
  minutes: number
  seconds: number
}

export const Timer = () => {
  const [time, setTime] = useState<TTime>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [isActive, setIsActive] = useState(false)
  const [totalTime, setTotalTime] = useState(0)
  const [progress, setProgress] = useState(0)

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

  useEffect(() => {
    if (totalTime > 0) {
      const totalSeconds = TimeToSeconds(time)
      const currentProgress = ((totalSeconds - totalTime) / totalSeconds) * 100
      setProgress(currentProgress)
    } else {
      setProgress(100)
    }
  }, [totalTime, time])

  const handleStart = () => {
    if (!isActive && totalTime !== 0) {
      const totalSeconds = TimeToSeconds(time);
      setTotalTime(totalSeconds);
      setIsActive(true);
    }else{
      setIsActive(false)
    }
  }

  const formatTime = (time: number) => {
    return String(time).padStart(2, '0')
  }
  const resetTime = () => {
    setTime({hours: 0, minutes: 0, seconds: 0})
    setTotalTime(0)
  }

 const setTimer = ({hours, minutes, seconds}: TTime) => {
  const newTime = { hours, minutes, seconds };
  setTime(newTime);
  setTotalTime(TimeToSeconds(newTime));
 }


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
      <div style={{ margin: '20px', display: "flex", gap: '20px' }}>
        <PauseButton onClick={handleStart} isActive={isActive}  />
        <ResetButton onClick={resetTime}  />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
        <button onClick={() => setTimer({hours: 0, minutes: 15, seconds: 0})}>15min</button>
        <button onClick={() => setTimer({hours: 0, minutes: 30, seconds: 0})}>30min</button>
        <button onClick={() => setTimer({hours: 1, minutes: 0, seconds: 0})}>1hr</button>
        <button onClick={() => setTimer({hours: 1, minutes: 30, seconds: 0})}>1hr 30min</button>
        <button onClick={() => setTimer({hours: 2, minutes: 0, seconds: 0})}>2hr</button>
      </div>
    </div>
  )
}

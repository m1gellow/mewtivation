import { useEffect, useState } from 'react';
import css from './index.module.scss';
import { Progressbar } from '../Progressbar';
import { PauseButton, ResetButton } from '../Button';
import { TimeToSeconds } from '../../lib/timeToSeconds';
import { useTimeTracker } from '../../store/useTimeTrackerStore';
import { useTask } from '../../store/useTasksStore';

export type TTime = {
  hours: number | undefined;
  minutes: number | undefined;
  seconds: number | undefined;
};

export const Timer = () => {
  const trackerTime = useTimeTracker((state) => state.data.time);
  const tasks = useTask((state) => state.tasks);
  const [time, setTime] = useState<TTime>({
    hours: trackerTime.hours,
    minutes: trackerTime.minutes,
    seconds: trackerTime.seconds,
  });
  const [isActive, setIsActive] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());

  useEffect(() => {
    const activeTasks = tasks.find((task) => task.isActive === true);
    setTime({
      hours: activeTasks?.time.hours,
      minutes: activeTasks?.time.minutes,
      seconds: activeTasks?.time.seconds,
    });
    setTotalTime(TimeToSeconds(activeTasks?.time));
  }, [tasks]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
        setTotalTime(0);
        e.preventDefault();
      }
      if (e.key === 'Enter' && totalTime !== 0) {
        setIsActive((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    setTotalTime(TimeToSeconds(trackerTime));
    setTime(trackerTime);
  }, [trackerTime]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        setIsActive(false);
        localStorage.setItem('timerState', JSON.stringify({ totalTime, isActive }));
      } else {
        const savedState = JSON.parse(localStorage.getItem('timerState') || '{}');
        if (savedState) {
          setTotalTime(savedState.totalTime);
          setIsActive(savedState.isActive);
          setStartTime(Date.now());
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    let interval: ReturnType<typeof setInterval> | undefined;

    if (isActive && totalTime > 0) {
      interval = setInterval(() => {
        const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        setTotalTime((prevTime) => Math.max(prevTime - elapsedTime, 0));
        setStartTime(Date.now());
      }, 1000);
    } else if (!isActive || totalTime === 0) {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isActive, totalTime]);

  useEffect(() => {
    if (totalTime > 0) {
      const totalSeconds = TimeToSeconds(time);
      const currentProgress = ((totalSeconds - totalTime) / totalSeconds) * 100;
      setProgress(currentProgress);
    } else {
      setProgress(100);
    }
  }, [totalTime, time]);

  // Start timer
  const handleStart = () => {
    if (!isActive && totalTime !== 0) {
      setIsActive(true);
      setStartTime(Date.now());
    } else {
      setIsActive(false);
    }
  };

  //to make format time
  const formatTime = (time: number) => {
    return String(time).padStart(2, '0')
  }

  // to reset time to 00:00:00
  const resetTime = () => {
    setTime({ hours: 0, minutes: 0, seconds: 0 })
    setTotalTime(0)
  }

  return (
    <div className={css.timerWrapper}>
      <div className={css.timer}>
        <span>
          {formatTime(Math.floor(totalTime / 3600))}:{formatTime(Math.floor((totalTime % 3600) / 60))}:
          {formatTime(totalTime % 60)}
        </span>
      </div>
      <Progressbar progress={progress} />
      <div style={{ margin: '20px', display: 'flex', gap: '20px' }}>
        <PauseButton onClick={handleStart} isActive={isActive} />
        <ResetButton onClick={resetTime} />
      </div>
    </div>
  )
}

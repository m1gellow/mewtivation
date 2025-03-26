import { create } from 'zustand'
import { TTime } from '../lib/types'

type TimeTracker = {
  data: {
    time: {
      seconds: number | undefined
      hours: number | undefined
      minutes: number | undefined
    }
  }
  setTaskTime: (time: TTime) => void
}

export const useTimeTracker = create<TimeTracker>((set) => ({
  data: {
    time: {
      seconds: 0,
      hours: 0,
      minutes: 0,
    },
  },

  setTaskTime: (time: TTime) => {
    if (time !== null) {
      set((state) => ({
        ...state,
        data: {
          ...state.data,
          time: time,
        },
      }))
    }
  },
}))

export const useSetTaskTime = (time: TTime) => {
  useTimeTracker.getState().setTaskTime(time)
}

import { create } from "zustand"
import { TTime } from "../components/Timer"

type TimeTracker = {
  data: {
    id: string,
    name: string,
    time: {
      seconds: number | undefined,
      hours: number | undefined,
      minutes: number | undefined,
    },
    isActive: boolean
  }
  setTaskName: (name: string) => void
  setTaskTime: (time: TTime) => void
}




export const useTimeTracker = create<TimeTracker>((set) => ({
  data: {
    id: "1",
    name: '',
    time: {
      seconds: 0,
      hours: 0,
      minutes: 0,
    },
    isActive: false
  },
  
  setTaskName: (name: string) => {
    if (name !== null) {
      set((state) => ({
        ...state,
        data: {
          ...state.data,
          name: name,
        },
      }))
    }
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


// useTimeTracker
export const useSetTaskName = (name: string) => {
  useTimeTracker.getState().setTaskName(name)
}

export const useSetTaskTime = (time: TTime) => {
  useTimeTracker.getState().setTaskTime(time)
}

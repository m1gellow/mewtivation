import { create } from "zustand"
import { ITrackerData } from "./../lib/types"

type TTasks = {
  tasks: ITrackerData[],
  setTasks: (task: ITrackerData) => void,
  setTaskToActive: (id: string) => void
}

export const useTask = create<TTasks>((set) => ({
  tasks: [
    {
      id: "1",
      name: 'Feed a cat',
      time: {
        hours: 0,
        minutes: 30,
        seconds: 0,
      },
      isActive: false,
    },
  ],

  setTasks: (task: ITrackerData) => {
    set((state) => ({
       tasks:[
        ...state.tasks,
        task,
       ]
    }))
  },
  setTaskToActive: (id: string) => {
      set((state) => ({
          tasks: state.tasks.map((task) => (
            task.id === id ? {...task, isActive: true} : {...task, isActive: false}
          ))
      }))
  },
  
}))


export const useSetTasks = (task: ITrackerData) => {
  useTask.getState().setTasks(task)
}
export const useSetTaskToActive = (id: string) => {
  useTask.getState().setTaskToActive(id)
}
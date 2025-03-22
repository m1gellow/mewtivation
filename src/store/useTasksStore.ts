import { create } from 'zustand'
import { ITrackerData } from './../lib/types'

type TTasks = {
  tasks: ITrackerData[]
  setTasks: (task: ITrackerData) => void
  setTaskToActive: (id: string) => void
  setUnActiveTask: (unActiveTasks: ITrackerData[]) => void
  setDeleteTask: (id: string) => void
  setTaskIsDone: (id: string) => void
}

export const useTask = create<TTasks>((set) => ({
  tasks: [
    {
      id: '1',
      name: 'Feed a cat',
      time: {
        hours: 0,
        minutes: 30,
        seconds: 80,
      },
      isActive: false,
      isDone: false
    },
  ],

  setTasks: (task: ITrackerData) => {
    set((state) => ({
      tasks: [...state.tasks, task],
    }))
  },
  setTaskToActive: (id: string) => {
    set((state) => ({
      tasks: state.tasks.map((task) => (task.id === id ? { ...task, isActive: true } : { ...task, isActive: false })),
    }))
  },
  setUnActiveTask: (activeTasks: ITrackerData[]) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        activeTasks.some((activeTasks) => activeTasks.id === task.id) ? { ...task, isActive: false } : task
      ),
    }))
  },
  setDeleteTask: (id: string) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    }))
  },
  setTaskIsDone: (id: string) => {
    set((state) => ({
      tasks: state.tasks.map((task) => (
        task.id === id ? {...task, isDone: true} : task
      ))
    }))
  }
}))

export const useSetTasks = (task: ITrackerData) => {
  useTask.getState().setTasks(task)
}
export const useGetTasks = () => {
  useTask.getState().tasks
}
export const useSetTaskToActive = (id: string) => {
  useTask.getState().setTaskToActive(id)
}
export const useSetTaskToUnActive = (activeTasks: ITrackerData[]) => {
  useTask.getState().setUnActiveTask(activeTasks)
}

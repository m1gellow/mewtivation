import { create } from 'zustand'
import { ITrackerData } from './../lib/types'

type TTasks = {
  tasks: ITrackerData[]
  setTasks: (task: ITrackerData) => void
  setDeleteTask: (id: string | undefined) => void
  setTaskIsDone: (id: string) => void
  setTaskActiveState: (id: string | undefined) => void
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
      isDone: false,
    },
  ],

  setTasks: (task: ITrackerData) => {
    set((state) => {
      const exists = state.tasks.some((existingTask) => existingTask.id === task.id)
      if (!exists) {
        return {
          tasks: [...state.tasks, task],
        }
      }
      return state
    })
  },
  setTaskActiveState: (id: string | undefined) => {
    set((state) => ({
      tasks: state.tasks.map((task) => {
        if (id === null) {
          return { ...task, isActive: false }
        }
        return { ...task, isActive: task.id === id }
      }),
    }))
  },
  setDeleteTask: (id: string | undefined) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    }))
  },
  setTaskIsDone: (id: string) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, isDone: task.isDone === true ? false : true } : task
      ),
    }))
  },
}))

export const useSetTasks = (task: ITrackerData) => {
  useTask.getState().setTasks(task)
}
export const useSetTaskToActive = (id?: string) => {
  useTask.getState().setTaskActiveState(id)
}
export const useSetDeleteTask = (id: string | undefined) => {
  useTask.getState().setDeleteTask(id)
}
export const useGetTasks = () => {
  useTask.getState().tasks
}
export const useSetTaskIsDone = (id: string) => {
  useTask.getState().setTaskIsDone(id)
}

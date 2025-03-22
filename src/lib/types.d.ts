export interface ITrackerData {
    id: string,
    name: string
    time: {
      seconds: number
      hours: number
      minutes: number
    },
    isActive: boolean
    isDone: boolean
  }
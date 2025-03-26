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

  export type TTime = {
    hours: number | undefined;
    minutes: number | undefined;
    seconds: number | undefined;
  };
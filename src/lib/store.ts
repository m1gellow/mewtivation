import {create} from 'zustand';
import { TTime } from '../components/Timer';
import { ITrackerData } from '../components/TaskMenu';



type TimeTracker = {
    data: ITrackerData,
    setTaskName: (name: string) => void;
    setTaskTime: (time: TTime) => void;
}




export const useTimeTracker = create<TimeTracker>((set) => ({
    data: {
        name: '',
        time: {
            seconds: 0,
            hours: 0,
            minutes: 0
        }
    },
    setTaskName: (name: string) => {
        if(name !== null){
            set((state) => ({
            ...state,
            data:{
                ...state.data,
                name: name
            }
        }))
        }
    },
    setTaskTime: (time: TTime) => {
        if(time !== null){
            set((state) => ({
                ...state,
                data:{
                    ...state.data,
                    time: time
                }
            }))
        }
    }
}))


export const setTaskName = (name: string) => {
    useTimeTracker.getState().setTaskName(name)
}

export const setTaskTime = (time: TTime) => {
    useTimeTracker.getState().setTaskTime(time)
}

import { TTime } from "./types";

export const TimeToSeconds = (time: TTime | undefined) => {
    if (!time) {
      return 0; 
    }
  
    const hoursInSeconds = (time.hours || 0) * 3600;
    const minutesInSeconds = (time.minutes || 0) * 60;
    const seconds = time.seconds || 0;
  
    return hoursInSeconds + minutesInSeconds + seconds;
  }
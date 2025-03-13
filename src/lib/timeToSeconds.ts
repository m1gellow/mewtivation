import { TTime } from "../components/Timer";

export const TimeToSeconds = (time: TTime) => time.hours * 3600 + time.minutes * 60 + time.seconds
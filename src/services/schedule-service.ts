import moment from "moment";
import { extendMoment } from 'moment-range';

export class ScheduleService {

    public dateInRange(start: Date, end: Date, date: Date) {
        const range = extendMoment(moment as any).range(start, end);
      
        return range.contains(date);
    }
}
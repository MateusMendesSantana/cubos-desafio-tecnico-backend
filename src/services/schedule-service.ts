import moment from "moment";
import { extendMoment } from 'moment-range';

export class ScheduleService {

    public dateInRange(start: moment.Moment, end: moment.Moment, date: moment.Moment) {
        const range = extendMoment(moment as any).range(start, end);
      
        return range.contains(date);
    }
}
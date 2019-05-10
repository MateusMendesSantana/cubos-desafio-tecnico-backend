import { Schedule } from "../models/schedule";
import moment from 'moment';

export class ScheduleService {

    public dateInRange(start: string, end: string, date: string) {
        return date >= start && date <= end;
    }

    public dateOverlaps(startA: string, endA: string, startB: string, endB: string) {
        return startA < endB && endA > startB;
    }

    public hasConflit(a: Schedule, b: Schedule) {
        if (
            a.isDaily() || b.isDaily() ||
            (a.isSpecific() && a.isSpecific() && a.day === b.day) ||
            (a.isWeekday() && b.isWeekday() && a.weekday === b.weekday) || 
            (a.isWeekday() && b.isSpecific() && a.weekday === moment(b.day).day()) ||
            (a.isSpecific() && b.isWeekday() && moment(a.day).day() === b.weekday)
        ) {
            return this.dateOverlaps(a.interval.start, a.interval.end, b.interval.start, b.interval.end);
        } else {
            return false;
        }
    }
}
import { Base } from './base';
import moment from 'moment';

export class Schedule extends Base {
    public scheduleType!: ScheduleType;
    public day?: string;
    public weekday?: ScheduleWeekday;
    public interval!: Interval;

    public validate() {
        if(!this.scheduleType) {
            throw new Error('scheduleType is required');
        }

        if(!this.day && this.scheduleType === ScheduleType.SPECIFIC) {
            throw new Error('day is required for scheduleType SPECIFIC');
        }

        if(!this.weekday && this.scheduleType === ScheduleType.WEEKDAY) {
            throw new Error('weekday is required for scheduleType WEEKDAY');
        }
    
        if(!this.interval) {
            throw new Error('interval is required');
        }

        if(!this.interval.start) {
            throw new Error('interval.start is required');
        }

        if(!this.interval.end) {
            throw new Error('interval.end is required.');
        }
    
        if(this.day) {
            if(!this.isMomentValid(this.day, 'DD-MM-YYYY')) {
                throw new Error('day invalid format(DD-MM-YYYY)');
            }
        }

        if(this.weekday) {
            if(!(this.weekday.toString() in ScheduleWeekday)) {
                throw new Error('invalid type in ScheduleWeekday');
            }
        }

        if(!(this.scheduleType.toString() in ScheduleType)) {
            throw new Error('invalid type in ScheduleType');
        }

        if(!this.isMomentValid(this.interval.start, 'HH:mm')) {
            throw new Error('invalid format(HH:mm) in interval.start');
        }

        if(!this.isMomentValid(this.interval.start, 'HH:mm')) {
            throw new Error('invalid format(HH:mm) in interval.end');
        }
    }

    isMomentValid(value: string, format: string) {
        return moment(value, format, true).isValid();
    }

    convertStringToMoment(value: string, format: string) {
        return moment(value, format, true);
    }
}

export interface Interval {
    start: string;
    end: string;
}

export enum ScheduleType {
    DAILY = 'DAILY',
    WEEKDAY = 'WEEKDAY',
    SPECIFIC = 'SPECIFIC'
}

export enum ScheduleWeekday {
    SUNDAY = 'SUNDAY',
    MONDAY = 'MONDAY',
    TUESDAY = 'TUESDAY',
    WEDNESDAY = 'WEDNESDAY',
    THURSDAY = 'THURSDAY',
    FRIDAY = 'FRIDAY',
    SATURDAY = 'SATURDAY',
} 
import { Base } from './base';
import moment from 'moment';

export class Schedule extends Base {
    public scheduleType!: ScheduleType;
    public day?: string;
    public interval!: Interval;

    public validate() {
        if(!this.scheduleType) {
            throw new Error('scheduleType is required');
        }

        if(!this.day && this.scheduleType === ScheduleType.SPECIFIC) {
            throw new Error('day is required for scheduleType SPECIFIC');
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

        if(!(this.scheduleType.toString() in ScheduleType)) {
            throw new Error('invalid type in scheduleType');
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
    WEEKLY = 'WEEKLY',
    SPECIFIC = 'SPECIFIC'
} 
import { Base } from './base';

export class Schedule extends Base {
    public scheduleType!: ScheduleType;
    public day?: string;
    public weekday?: ScheduleWeekday;
    public interval!: Interval;

    public isDaily() {
        return this.scheduleType === ScheduleType.DAILY;
    }

    public isWeekday() {
        return this.scheduleType === ScheduleType.WEEKDAY;
    }

    public isSpecific() {
        return this.scheduleType === ScheduleType.SPECIFIC;
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
    SUNDAY = 0,
    MONDAY = 1,
    TUESDAY = 2,
    WEDNESDAY = 3,
    THURSDAY = 4,
    FRIDAY = 5,
    SATURDAY = 6,
} 
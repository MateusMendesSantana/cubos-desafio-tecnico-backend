import { Base } from './base';

export class Schedule extends Base {
    public scheduleType!: ScheduleType;
    public day?: string;
    public weekday?: ScheduleWeekday;
    public interval!: Interval;

    constructor(data: any) {
        data.interval = new Interval(data.interval);
        super(data);
    }

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

export class Interval {
    public start!: string;
    public end!: string;

    constructor(data: any) {
        Object.assign(this, data);
    }
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
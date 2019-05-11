import { Base } from './base';
import { IsNotEmpty, ValidateNested, Matches, ValidateIf, Max, Min } from "class-validator";

export class Schedule extends Base {
    @IsNotEmpty()
    public scheduleType!: ScheduleType;

    @ValidateIf((schedule: Schedule) => schedule.isSpecific())
    @IsNotEmpty()
    @Matches(/\d{2}-\d{2}-\d{4}/g)
    public day?: string;

    @ValidateIf((schedule: Schedule) => schedule.isWeekday())
    @IsNotEmpty()
    @Min(0)
    @Max(6)
    public weekday?: ScheduleWeekday;

    @IsNotEmpty()
    @ValidateNested()
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
    @IsNotEmpty()
    @Matches(/\d{2}:\d{2}/g)
    public start!: string;

    @IsNotEmpty()
    @Matches(/\d{2}:\d{2}/g)
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
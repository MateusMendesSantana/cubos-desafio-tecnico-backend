import { Base } from "./base";

export class Schedule extends Base {
    public day!: Date;
    public intervals!: Interval[];
}

export interface Interval {
    start: string;
    end: string;
}
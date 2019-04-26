import { Base } from "./base";
import moment from 'moment';

export class Schedule extends Base {
    public day!: string;
    public intervals!: Interval[];

    public validate() {
        if(!this.isMomentValid(this.day, "DD-MM-YYYY")) {
            throw new Error("day invalid format(DD-MM-YYYY)");
        }

        this.intervals.forEach((interval, index) => {
            if(!this.isMomentValid(interval.start, "HH:mm")) {
                throw new Error(`invalid format(HH:mm) in interval[${index}].start`);
            }

            if(!this.isMomentValid(interval.start, "HH:mm")) {
                throw new Error(`invalid format(HH:mm) in interval[${index}].end`);
            }
        });
    }

    isMomentValid(value: string, format: string) {
        return moment(value, format, true).isValid();
    }
}

export interface Interval {
    start: string;
    end: string;
}
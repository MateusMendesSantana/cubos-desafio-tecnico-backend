import { GenericDAO } from "./generic-dao";
import { Schedule } from "../models/schedule";
import { ScheduleService } from "../services/schedule-service";

export class ScheduleDAO extends GenericDAO<Schedule> {
    constructor(
        database: any,
        protected scheduleService: ScheduleService
    ) {
        super(Schedule, 'schedule', database);
    }

    list(query?: {start: string, end: string}) {
        if(query) {
            return super.list((schedule: any) => {
                schedule = this.createInstance(schedule);

                if(schedule.isDaily()) {
                    return true;
                }
    
                if(schedule.isWeekday()) {
                    // TODO
                    return true;
                }
    
                if(schedule.day) {
                    return this.scheduleService.dateInRange(query.start, query.end, schedule.day);
                }

                return false;
            });
        } else {
            return super.list();
        }
    }
}
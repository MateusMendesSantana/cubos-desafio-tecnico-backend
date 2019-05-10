import { GenericDAO } from "./generic-dao";
import { Schedule, ScheduleType } from "../models/schedule";
import { ScheduleService } from "../services/schedule-service";

export class ScheduleDAO extends GenericDAO<Schedule> {
    constructor(
        database: any,
        protected scheduleService: ScheduleService
    ) {
        super('schedule', database);
    }

    list(query?: {start: string, end: string}) {
        if(query) {
            return super.list((schedule: Schedule) => {
                if(schedule.isDaily()) {
                    return true;
                }
    
                if(schedule.isWeekday()) {
                    return schedule.weekday;
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
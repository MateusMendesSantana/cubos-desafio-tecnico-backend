import { GenericDAO } from "./generic-dao";
import { Schedule } from "../models/schedule";

export class ScheduleDAO extends GenericDAO<Schedule> {
    constructor(database: any) {
        super('schedule', database);
    }
}
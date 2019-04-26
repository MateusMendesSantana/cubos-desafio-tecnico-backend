import { GenericController } from "./generic-controller";
import { Schedule } from "../models/schedule";

export class ScheduleController extends GenericController<Schedule> {
    protected createInstance(data: any): Schedule {
        return new Schedule(data);
    }
}
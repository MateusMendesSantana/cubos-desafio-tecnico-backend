import { GenericController } from './generic-controller';
import { Schedule } from '../models/schedule';
import { ScheduleService } from '../services/schedule-service';
import { ScheduleDAO } from '../DAOs/schedule-dao';
import moment from 'moment';

export class ScheduleController extends GenericController<Schedule> {
    constructor(
        protected dao: ScheduleDAO,
        protected scheduleService: ScheduleService
    ) {
        super(dao);
    }

    protected createInstance(data: any): Schedule {
        return new Schedule(data);
    }

    async list(req: any, res: any) {
        if (!req.query) {
            super.list(req, res);
        } if (!req.query.start || !req.query.end) {
            res.status(400).send({message: 'query bad request'});
        }

        const start = moment(req.query.start, 'DD-MM-YYYY', true).toDate();
        const end = moment(req.query.end, 'DD-MM-YYYY', true).toDate();

        const result = this.dao.list((schedule: { day: Date; }) => {
            return this.scheduleService.dateInRange(start, end, schedule.day);
        });

        res.send(result);
    }
}
import { GenericController } from './generic-controller';
import { Schedule, ScheduleType } from '../models/schedule';
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
        if (Object.keys(req.body).length === 0) {
            super.list(req, res);
        } else {
            if(!req.body.start || !req.body.end) {
                res.status(400).send({
                    message: 'query bad request',
                    exemple: '{"start": "01-01-2019", "end": "04-03-2019"}'
                });
            }
        }

        const start = moment(req.query.start, 'DD-MM-YYYY', true);
        const end = moment(req.query.end, 'DD-MM-YYYY', true);

        if(!start) {
            res.status(400).send({message: 'incorret value for query.start in request'});

        } else if(!end) {
            res.status(400).send({message: 'incorret value for query.end in request'});
        } else {
            const result = this.dao.list((schedule: any) => {
                if(schedule.scheduleType === ScheduleType.DAILY) {
                    return true;
                }
    
                if(schedule.scheduleType === ScheduleType.WEEKDAY) {
                    return true;
                }
    
                return this.scheduleService.dateInRange(start.toDate(), end.toDate(), schedule.day);
            });
    
            res.send(result);
        }
    }
}
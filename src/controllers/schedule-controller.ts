import { GenericController } from './generic-controller';
import { Schedule, ScheduleType, ScheduleWeekday} from '../models/schedule';
import { ScheduleService } from '../services/schedule-service';
import { ScheduleDAO } from '../DAOs/schedule-dao';
import { body } from 'express-validator/check';

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

    async create(req: any, res: any, next: any) {
        if (this.dao.list().some(schedule => {
            const a = this.createInstance(req.body);
            const b = this.createInstance(schedule);

            return this.scheduleService.hasConflit(a, b);
        })) {
            res.status(500).send({
                message: 'cannot create instance, there was a conflict with other schedules'
            });
        } else {
            super.create(req, res, next);
        }
    }

    async list(req: any, res: any, next: any) {
        if (Object.keys(req.body).length === 0) {
            super.list(req, res, next);
        } else if(!req.body.start || !req.body.end) {
            res.status(400).send({
                message: 'query bad request',
                exemple: '{"start": "01-01-2019", "end": "04-03-2019"}'
            });
        } else if(!req.body.start) {
            res.status(400).send({message: 'incorret value for query.start in request'});
        } else if(!req.body.end) {
            res.status(400).send({message: 'incorret value for query.end in request'});
        } else {
            const result = this.dao.list(req.body);
    
            res.send(result? result: []);
        }
    }

    validate() {
        return [
            body('scheduleType')
            .exists()
            .withMessage('cannot be empty')
            .isIn(Object.values(ScheduleType))
            .withMessage('must be DAILY, SPECIFIC or WEEKDAY'),

            body('day')
            .custom((value, { req }) => {
                return req.body.scheduleType !== ScheduleType.SPECIFIC || (
                    req.body.scheduleType !== ScheduleType.SPECIFIC && value);
            })
            .withMessage('cannot be empty for scheduleType SPECIFIC')
            .exists()
            .matches(/\d{2}-\d{2}-\d{4}/g)
            .withMessage('needs to be in "hh:mm" format'),

            body('weekday')
            .custom((value, { req }) => {
                return req.body.scheduleType !== ScheduleType.WEEKDAY || (
                    req.body.scheduleType !== ScheduleType.WEEKDAY && value);
            })
            .withMessage('cannot be empty for scheduleType WEEKDAY')
            .isIn(Object.values(ScheduleWeekday))
            .withMessage('needs to be a day of the week')
        ];
    }
}
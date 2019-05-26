import { GenericController } from './generic-controller';
import { Schedule, ScheduleType, ScheduleWeekday } from '../models/schedule';
import { ScheduleService } from '../services/schedule-service';
import { ScheduleDAO } from '../DAOs/schedule-dao';
import { body } from 'express-validator/check';

export class ScheduleController extends GenericController<Schedule> {
    public constrains: any[];

    constructor(
        protected dao: ScheduleDAO,
        protected scheduleService: ScheduleService
    ) {
        super(dao);
        this.constrains = this.generateConstrains();
    }

    async create(req: any, res: any, next: any) {
        if (this.dao.list().some(schedule => {
            const a = this.dao.createInstance(req.body);
            const b = this.dao.createInstance(schedule);

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

    generateConstrains() {
        const customDayValidator = (value: any, { req }: any) => {
            if(req.body.scheduleType === ScheduleType.SPECIFIC) {
                if(!value) {
                    return false;
                }
            }

            return true;
        };

        const customWeekdayValidator = (value: any, { req }: any) => {
            if(req.body.scheduleType === ScheduleType.WEEKDAY) {
                if(!value) {
                    return false;
                }
            }

            return true;
        };

        return [
            body('scheduleType')
            .exists()
            .withMessage('cannot be empty')
            .isIn(Object.values(ScheduleType))
            .withMessage('must be DAILY, SPECIFIC or WEEKDAY'),

            body('day')
            .custom(customDayValidator)
            .withMessage('cannot be empty for scheduleType SPECIFIC')
            .custom(customDayValidator)
            .custom((value: string) => {
                return !value || (value.length <= 10 && value.match(/\d{2}-\d{2}-\d{4}/g)!.length > 0);
            })
            .withMessage('needs to be in dd-mm-yyyy format'),

            body('weekday')
            .custom(customWeekdayValidator)
            .withMessage('cannot be empty for scheduleType WEEKDAY')
            .custom(customWeekdayValidator)
            .custom((value: any) => {
                return !value || Object.values(ScheduleWeekday).includes(value)
            })
            .withMessage('needs to be a day of the week'),

            body('interval')
            .exists()
            .withMessage('cannot be empty'),

            body('interval.start')
            .exists()
            .withMessage('cannot be empty')
            .matches(/\d{2}:\d{2}/g)
            .withMessage('needs to be in hh:mm format'),

            body('interval.end')
            .exists()
            .withMessage('cannot be empty')
            .matches(/\d{2}:\d{2}/g)
            .withMessage('needs to be in hh:mm format'),
        ];
    }
}
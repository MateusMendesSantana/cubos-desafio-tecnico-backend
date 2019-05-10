import { GenericController } from './generic-controller';
import { Schedule, ScheduleType, ScheduleWeekday } from '../models/schedule';
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

    async create(req: any, res: any) {
        if (this.dao.list().some(schedule => {
            return this.scheduleService.hasConflit(req.body, schedule);
        })) {
            res.status(500).send({
                message: 'cannot create instance'
            });
        } else {
            super.create(req, res);
        }
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

        if(!req.body.start) {
            res.status(400).send({message: 'incorret value for query.start in request'});

        } else if(!req.body.end) {
            res.status(400).send({message: 'incorret value for query.end in request'});
        } else {
            const result = this.dao.list(req.body);
    
            res.send(result? result: []);
        }
    }

    public validate(schedule: Schedule) {
        if(!schedule.scheduleType) {
            throw new Error('scheduleType is required');
        }

        if(!schedule.day && schedule.scheduleType === ScheduleType.SPECIFIC) {
            throw new Error('day is required for scheduleType SPECIFIC');
        }

        if(!schedule.weekday && schedule.scheduleType === ScheduleType.WEEKDAY) {
            throw new Error('weekday is required for scheduleType WEEKDAY');
        }
    
        if(!schedule.interval) {
            throw new Error('interval is required');
        }

        if(!schedule.interval.start) {
            throw new Error('interval.start is required');
        }

        if(!schedule.interval.end) {
            throw new Error('interval.end is required.');
        }
    
        if(schedule.day) {
            if(!this.isDateValid(schedule.day, 'DD-MM-YYYY')) {
                throw new Error('day invalid format(DD-MM-YYYY)');
            }
        }

        if(schedule.weekday) {
            if(!(schedule.weekday.toString() in ScheduleWeekday)) {
                throw new Error('invalid type in ScheduleWeekday');
            }
        }

        if(!(schedule.scheduleType.toString() in ScheduleType)) {
            throw new Error('invalid type in ScheduleType');
        }

        if(!this.isDateValid(schedule.interval.start, 'HH:mm')) {
            throw new Error('invalid format(HH:mm) in interval.start');
        }

        if(!this.isDateValid(schedule.interval.start, 'HH:mm')) {
            throw new Error('invalid format(HH:mm) in interval.end');
        }
    }

    isDateValid(value: string, format: string) {
        return moment(value, format, true).isValid();
    }
}
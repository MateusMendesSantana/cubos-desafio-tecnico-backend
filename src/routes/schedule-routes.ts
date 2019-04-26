import { ScheduleController } from '../controllers/schedule-controller';
import { ScheduleDAO } from '../DAOs/schedule-dao';
import { lowdb } from '../datasources/lowdb';
import { Router } from 'express';

export const router = Router();

const dao = new ScheduleDAO(lowdb);
const scheduleController = new ScheduleController(dao);

router.post('/schedules', scheduleController.create.bind(scheduleController));
router.patch('/schedules', scheduleController.update.bind(scheduleController));
router.get('/schedules', scheduleController.list.bind(scheduleController));
router.get('/schedules/:id', scheduleController.read.bind(scheduleController));
router.delete('/schedules/:id', scheduleController.delete.bind(scheduleController));

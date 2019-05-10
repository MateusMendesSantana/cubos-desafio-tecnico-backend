import { ScheduleController } from '../controllers/schedule-controller';
import { ScheduleDAO } from '../DAOs/schedule-dao';
import { lowdb } from '../datasources/lowdb';
import { Router } from 'express';
import { ScheduleService } from '../services/schedule-service';

export const router = Router();

const scheduleService = new ScheduleService();
const dao = new ScheduleDAO(lowdb, scheduleService);
const scheduleController = new ScheduleController(dao, scheduleService);

router.post('/schedules', scheduleController.create.bind(scheduleController));
router.put('/schedules/:id', scheduleController.update.bind(scheduleController));
router.get('/schedules', scheduleController.list.bind(scheduleController));
router.get('/schedules/:id', scheduleController.read.bind(scheduleController));
router.delete('/schedules/:id', scheduleController.delete.bind(scheduleController));

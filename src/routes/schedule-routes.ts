import { ScheduleController } from '../controllers/schedule-controller';
import { ScheduleDAO } from '../DAOs/schedule-dao';
import { lowdb } from '../datasources/lowdb';
import { Router } from 'express';
import { ScheduleService } from '../services/schedule-service';

export const router = Router();

const scheduleService = new ScheduleService();
const dao = new ScheduleDAO(lowdb, scheduleService);
const scheduleController = new ScheduleController(dao, scheduleService);

router.post('/schedules'        , (...args) => scheduleController.create(...args));
router.put('/schedules/:id'     , (...args) => scheduleController.update(...args));
router.get('/schedules'         , (...args) => scheduleController.list(...args));
router.get('/schedules/:id'     , (...args) => scheduleController.read(...args));
router.delete('/schedules/:id'  , (...args) => scheduleController.delete(...args));

import { ScheduleController } from '../controllers/schedule-controller';
import { ScheduleDAO } from '../DAOs/schedule-dao';
import { lowdb } from '../datasources/lowdb';
import server from '../server';

const dao = new ScheduleDAO(lowdb);
const scheduleController = new ScheduleController(dao);

server.post('/schedules', scheduleController.create);
server.patch('/schedules', scheduleController.update);
server.get('/schedules', scheduleController.list);
server.get('/schedules/:id', scheduleController.read);
server.delete('/schedules/:id', scheduleController.delete);

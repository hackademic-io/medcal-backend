import { Router } from 'express';
import appointmentController from '../controllers/appointment-controller';
import authMiddleware from '../middlewares/auth-middleware';

const router = Router();

router.get('/appointments', appointmentController.getAll);
router.get('/appointment/:id', authMiddleware(), appointmentController.getOne);
router.get('/appointment/booked', appointmentController.getBooked);
router.get(
  '/appointments/canceled',
  appointmentController.getCanceledAppointments
);
router.post('/appointment', authMiddleware(), appointmentController.createOne);
router.put(
  '/appointment/:id',
  authMiddleware(),
  appointmentController.updateOne
);

router.put(
  '/appointment/changePendingStatus/:id',
  appointmentController.changeIsPending
);

router.delete(
  '/appointment/:id',
  authMiddleware(),
  appointmentController.deleteOne
);

router.delete(
  '/appointments',
  authMiddleware(),
  appointmentController.deleteMany
);

export default router;

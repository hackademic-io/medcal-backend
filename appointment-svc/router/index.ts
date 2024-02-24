import { Router } from 'express';
import appointmentController from '../controllers/appointment-controller';
import authMiddleware from '../middlewares/auth-middleware';

const router = Router();

router.get('/appointments', appointmentController.getAll);
router.get('/appointment/:id', authMiddleware(), appointmentController.getOne);
router.post('/appointment', authMiddleware(), appointmentController.createOne);
router.put(
  '/appointment/:id',
  authMiddleware(),
  appointmentController.updateOne
);
router.put(
  '/appointment/reschedule/:id',
  appointmentController.rescheduleAppointment
);
router.put(
  '/appointment/confirm/:id',
  appointmentController.confirmAppointment
);
router.put(
  '/appointment/changeOpenToEarlierStatus/:id',
  appointmentController.changeOpenToEarlier
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

export default router;

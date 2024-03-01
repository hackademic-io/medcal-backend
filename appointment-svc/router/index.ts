import { Router } from 'express';
import appointmentController from '../controllers/appointment-controller';
import authMiddleware, {
  IMiddlewareRequest,
} from '../middlewares/auth-middleware';
import decryptData from '../utils/decryption';

const router = Router();

router.get('/appointments', appointmentController.getAll);
router.get('/appointment/:id', appointmentController.getOne);
router.get('/appointment/booked', appointmentController.getBooked);
router.post('/appointment', appointmentController.createOne);
router.put(
  '/appointment/:id',

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

router.delete('/appointment/:id', appointmentController.deleteOne);

router.delete('/appointments', appointmentController.deleteMany);

router.post('/appointment/hash', authMiddleware, (req, res) => {
  const { decryptedData } = req as IMiddlewareRequest;
  res.send(decryptedData);
});

export default router;

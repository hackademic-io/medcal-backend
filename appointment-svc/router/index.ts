import { Router } from 'express';
import appointmentController from '../controllers/appointment-controller';
import authMiddleware from '../middlewares/auth-middleware';
import decryptData from '../utils/decryption';

const router = Router();

router.get('/appointments', appointmentController.getAll);
router.get('/appointment/:id', authMiddleware(), appointmentController.getOne);
router.get('/appointment/booked', appointmentController.getBooked);
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

router.delete('/appointment/:id', appointmentController.deleteOne);

router.delete(
  '/appointments',
  authMiddleware(),
  appointmentController.deleteMany
);

router.post('/appointment/hash', (req, res) => {
  const { hash, encryptionIV } = req.body;
  console.log(hash);
  console.log(encryptionIV);
  const decryptedString = decryptData(hash, encryptionIV);
  const decryptedData = JSON.parse(decryptedString);
  res.send(decryptedData);
});

export default router;

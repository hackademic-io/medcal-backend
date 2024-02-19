import { Router } from 'express';
import appointmentController from '../controllers/appointment-controller';
import authMiddleware from '../middlewares/auth-middleware';

const router = Router();

router.get('/appointments', authMiddleware(), appointmentController.getAll);
router.get('/appointment/:id', authMiddleware(), appointmentController.getOne);
router.post('/appointment', authMiddleware(), appointmentController.createOne);
router.delete(
  '/appointment/:id',
  authMiddleware(),
  appointmentController.deleteOne
);

export default router;

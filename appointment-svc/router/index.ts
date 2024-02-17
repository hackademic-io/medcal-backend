import { Router } from 'express';
import appointmentController from '../controllers/appointment-controller';
import authMiddleware from '../middlewares/auth-middleware';

const router = Router();

router.get('/appointment', authMiddleware(), appointmentController.getAll);
router.post('/appointment', authMiddleware(), appointmentController.createOne);
router.delete(
  '/appointment/:id',
  authMiddleware(),
  appointmentController.deleteOne
);

export default router;

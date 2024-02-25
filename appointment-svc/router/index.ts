import { Router } from 'express';
import appointmentController from '../controllers/appointment-controller';
import authMiddleware from '../middlewares/auth-middleware';
import decryptData from '../models/decryption'

const router = Router();

router.get('/appointments', appointmentController.getAll);
router.get('/appointment/:id', authMiddleware(), appointmentController.getOne);
router.post('/appointment', authMiddleware(), appointmentController.createOne);
router.put(
  '/appointment/:id',
  authMiddleware(),
  appointmentController.updateOne
);
router.delete(
  '/appointment/:id',
  authMiddleware(),
  appointmentController.deleteOne
);

router.post('/appointment/hash', (req, res) => {
  const { hash, encryptionIV } = req.body
  const decryptedString = decryptData(hash, encryptionIV)
  const decryptedData = JSON.parse(decryptedString)
})

export default router;

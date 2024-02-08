import express from 'express';
import availableAppointmentsRouter from './availableAppointments';

const router = express.Router();

router.use('/available-appointments', availableAppointmentsRouter);

export default router;

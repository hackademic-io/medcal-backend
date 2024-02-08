import express from 'express';
import availableAppointmentsRouter from './availableAppointments';
import availablePatientsRouter from './availablePatients';

const router = express.Router();

router.use('/available-appointments', availableAppointmentsRouter);
router.use('/patients', availablePatientsRouter);

export default router;

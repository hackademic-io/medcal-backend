import express from 'express';
// import availableAppointmentsRouter from './availableAppointments';
import { AppointmentController } from '../controllers/appointment-controller';
import availablePatientsRouter from './availablePatients';
import createOfferRouter from './createOffer';

const router = express.Router();
const appointmentController = new AppointmentController();

router.get(
  '/available-appointments',
  appointmentController.listAvailableAppointments
);

// router.use('/available-appointments', availableAppointmentsRouter);
router.use('/patients', availablePatientsRouter);
router.use('/create-offer', createOfferRouter);

export default router;

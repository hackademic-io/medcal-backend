import express from 'express';
// import availableAppointmentsRouter from './availableAppointments';
import { AppointmentController } from '../controllers/appointment-controller';
// import availablePatientsRouter from './availablePatients';
import { PatientController } from '../controllers/patient-controller';
// import createOfferRouter from './createOffer';
import { OfferController } from '../controllers/offer-controller';

const router = express.Router();
const patientController = new PatientController();
const appointmentController = new AppointmentController();
const offerController = new OfferController();

router.get(
  '/available-appointments',
  appointmentController.listAvailableAppointments
);

// router.use('/available-appointments', availableAppointmentsRouter);
// router.use('/patients', availablePatientsRouter);
router.get('/opted-in', patientController.listAvailablePatients);
// router.use('/create-offer', createOfferRouter);
router.post('/create-offer', offerController.createOffer);

export default router;

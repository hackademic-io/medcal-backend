import express from 'express';
import { AppointmentController } from '../controllers/appointment-controller';
import { PatientController } from '../controllers/patient-controller';
import { OfferController } from '../controllers/offer-controller';

const router = express.Router();
const patientController = new PatientController();
const appointmentController = new AppointmentController();
const offerController = new OfferController();

router.get(
  '/available-appointments',
  appointmentController.listAvailableAppointments
);
router.get('/opted-in', patientController.listAvailablePatients);
router.post('/create-offer', offerController.createOffer);

export default router;

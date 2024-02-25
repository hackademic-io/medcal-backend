import express from 'express';
import AppointmentController from '../controllers/appointment-controller';

const router = express.Router();

router.get(
  '/appointments/available',
  AppointmentController.getAvailableAppointments
);

export default router;

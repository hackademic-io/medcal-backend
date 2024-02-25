import express from 'express';
import AppointmentController from '../controllers/appointment-controller';
import NotificationService from '../services/NotificationService';

const router = express.Router();

router.get(
  '/appointments/available',
  AppointmentController.getAvailableAppointments
);

router.post(
  '/notification/rescheduling-prompt',
  NotificationService.sendReschedulingPrompt
);

export default router;

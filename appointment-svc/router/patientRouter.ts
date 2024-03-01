import { Router } from 'express';
import patientAppointmentController from '../controllers/patient-appointment-controller';

const patientRouter = Router();

patientRouter.put(
  '/appointment/reschedule/:id',
  patientAppointmentController.rescheduleAppointment
);
patientRouter.put(
  '/appointment/confirm/:id',
  patientAppointmentController.confirmAppointment
);

patientRouter.delete(
  '/appointment/:id',
  patientAppointmentController.cancelAppointment
);

patientRouter.get('/appointment/hash', (req, res) => {
  res.send('Connection good');
});

export default patientRouter;

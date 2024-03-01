import { Router } from 'express';
import patientAppointmentController from '../controllers/patient-appointment-controller';
import hashMiddlware from '../middlewares/hash-middleware';

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

patientRouter.post('/appointment/hash', hashMiddlware, (req, res) => {
  const { decryptedData } = req.body;
  res.send(decryptedData);
});

export default patientRouter;

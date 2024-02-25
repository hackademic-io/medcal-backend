import { Request, Response } from 'express';
import appointmentRepository from '../services/db-service/AppointmentRepository';

export class AppointmentController {
  listAvailableAppointments = async (req: Request, res: Response) => {
    try {
      const availableAppointments =
        await appointmentRepository.fetchAvailableAppointments();
      res.json(availableAppointments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}

import { Request, Response } from 'express';
import { AppointmentRepository } from '../services/db-service/AppointmentRepository';

export class AppointmentController {
  private appointmentRepository = new AppointmentRepository();

  listAvailableAppointments = async (req: Request, res: Response) => {
    try {
      const availableAppointments =
        await this.appointmentRepository.fetchAvailableAppointments();
      res.json(availableAppointments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}

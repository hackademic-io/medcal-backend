import { Request, Response } from 'express';
import AppointmentRepository from '../services/db-service/AppointmentRepository';

class AppointmentController {
  async getAvailableAppointments(req: Request, res: Response) {
    console.log('Got available appointments');
    try {
      const availableAppointments =
        await AppointmentRepository.fetchAvailableAppointment();
      res.json(availableAppointments);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching available appointments' });
    }
  }
}

export default new AppointmentController();

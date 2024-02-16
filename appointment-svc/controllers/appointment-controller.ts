import { Request, Response, NextFunction } from 'express';
import AppointmentRepository from '../service/db-service/AppointmentRepository';

class AppoinmentController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const appointments = await AppointmentRepository.getAll();
      res.json(appointments);
    } catch (error) {
      console.error('Error fetching all appointments:', error);
    }
  }

  async createOne(req: Request, res: Response, next: NextFunction) {
    const appointment_data = req.body;
    try {
      const appointment = await AppointmentRepository.createOne(
        appointment_data
      );
      res.json(appointment);
    } catch (error) {
      console.error('Error creating appointment:', error);
    }
  }
}

export default new AppoinmentController();

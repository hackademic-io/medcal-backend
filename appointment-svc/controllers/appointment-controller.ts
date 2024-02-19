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

  async getOne(req: Request, res: Response, next: NextFunction) {
    const appointment_id = req.params.id;

    try {
      const appointment = await AppointmentRepository.getOne(appointment_id);
      res.json(appointment);
    } catch (error) {
      console.error('Error fetching all appointments:', error);
    }
  }

  async updateOne(req: Request, res: Response, next: NextFunction) {
    const appointment_id = req.params.id;
    const appointment_data = req.body;

    try {
      const appointment = await AppointmentRepository.updateOne(
        appointment_data,
        appointment_id
      );
      res.json(appointment);
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

  async deleteOne(req: Request, res: Response, next: NextFunction) {
    const appointment_id = req.params.id;

    try {
      const deletedAppointment = await AppointmentRepository.deleteOne(
        appointment_id
      );
      res.json(deletedAppointment);
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  }
}

export default new AppoinmentController();

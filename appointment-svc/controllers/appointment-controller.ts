import { Request, Response, NextFunction } from 'express';
import AppointmentRepository from '../service/db-service/AppointmentRepository';

class AppoinmentController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    let queryDate;

    if (req.query.date !== undefined) {
      queryDate = req.query.date as string;
    }

    try {
      let appointments;

      if (queryDate) {
        appointments = await AppointmentRepository.getAllByDate(queryDate);
      } else {
        appointments = await AppointmentRepository.getAll();
      }

      res.json(appointments);
    } catch (error) {
      console.error('Error fetching all appointments:', error);
      res.status(500).json({ error: 'Error fetching all appointments:' });
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    const appointment_id = req.params.id;

    try {
      const appointment = await AppointmentRepository.getOne(appointment_id);
      res.json(appointment);
    } catch (error) {
      console.error('Error fetching all appointments:', error);
      res.status(500).json({ error: 'Error getting one appointment:' });
    }
  }

  async updateOne(req: Request, res: Response, next: NextFunction) {
    const appointment_id = req.params.id;
    const appointment_data = req.body;

    console.log(appointment_data);

    try {
      const appointment = await AppointmentRepository.updateOne(
        appointment_data,
        appointment_id
      );
      res.json(appointment);
    } catch (error) {
      console.error('Error updating one appointment:', error);
      res.status(500).json({ error: 'Error updating one appointment:' });
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
      res.status(500).json({ error: 'Error creating appointment' });
    }
  }

  async deleteOne(req: Request, res: Response, next: NextFunction) {
    const appointment_id = req.params.id;

    try {
      const canceledAppointment = await AppointmentRepository.deleteOne(
        appointment_id
      );
      res.json(canceledAppointment);
    } catch (error) {
      console.error('Error deleting appointment:', error);
      res.status(500).json({ error: 'Error deleting appointment' });
    }
  }
}

export default new AppoinmentController();

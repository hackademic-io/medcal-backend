import { Request, Response, NextFunction } from 'express';
import AppointmentRepository from '../service/db-service/AppointmentRepository';

class AppoinmentController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    let queryMaxDate = req.query.MaxDate as string;
    let queryMinDate = req.query.MinDate as string;

    try {
      const appointments = await AppointmentRepository.getAll(
        queryMaxDate,
        queryMinDate
      );

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

    const currentStatus = await AppointmentRepository.checkStatus(
      appointment_id
    );

    if (currentStatus === 'CONFIRMED') {
      return res.status(400).json({ error: 'Appointment already confirmed' });
    }

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

    const currentStatus = await AppointmentRepository.checkStatus(
      appointment_id
    );

    if (currentStatus === 'CANCELED') {
      return res.status(400).json({ error: 'Appointment already canceled' });
    }

    try {
      const canceledAppointment = await AppointmentRepository.deleteOne(
        appointment_id
      );
      res.json(canceledAppointment);
    } catch (error) {
      console.error('Error deleting appointment:', error);
      res
        .status(500)
        .json({ error: 'Error canceling appointment, please try again later' });
    }
  }
}

export default new AppoinmentController();

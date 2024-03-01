import { Request, Response, NextFunction, query } from 'express';
import AppointmentRepository from '../service/db-service/AppointmentRepository';
import {
  IUpdateAppointmentProps,
  AppointmentStatus,
} from '../types/appointment.interface';

class PatientAppointmentController {
  async rescheduleAppointment(req: Request, res: Response, next: NextFunction) {
    const old_appointment_id = req.params.id;
    const appointment_data = req.body;
    const new_appointment_id = appointment_data.open_app_id;

    const currentStatus = await AppointmentRepository.checkStatus(
      new_appointment_id
    );

    if (currentStatus === 'BOOKED') {
      return res.status(400).json({ error: 'Appointment already booked' });
    }

    const new_appointment_data: IUpdateAppointmentProps = {
      last_name: appointment_data.last_name,
      first_name: appointment_data.first_name,
      email: appointment_data.email,
      open_to_earlier: false,
      isPending: false,
      status: AppointmentStatus.BOOKED,
    };

    try {
      await AppointmentRepository.deleteOne(old_appointment_id);

      const newAppointment = await AppointmentRepository.updateOne(
        new_appointment_data,
        new_appointment_id
      );

      res.json(newAppointment);
    } catch (error) {
      console.error('Error updating one appointment:', error);
      res.status(500).json({ error: 'Error updating appointment' });
    }
  }

  async cancelAppointment(req: Request, res: Response, next: NextFunction) {
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
      res.status(500).json({ error: 'Error canceling appointment' });
    }
  }

  async confirmAppointment(req: Request, res: Response, next: NextFunction) {
    const appointment_id = req.params.id;

    const currentStatus = await AppointmentRepository.checkStatus(
      appointment_id
    );

    if (currentStatus === 'CONFIRMED') {
      return res.status(400).json({ error: 'Appointment already confirmed' });
    }

    try {
      const appointment = await AppointmentRepository.updateStatusToConfirmed(
        appointment_id
      );
      res.json(appointment);
    } catch (error) {
      console.error('Error confirming appointment:', error);
      res.status(500).json({ error: 'Error confirming appointment' });
    }
  }
}

export default new PatientAppointmentController();

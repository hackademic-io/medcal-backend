import { Request, Response, NextFunction, query } from 'express';
import AppointmentRepository from '../service/db-service/AppointmentRepository';
import {
  IUpdateAppointmentProps,
  AppointmentStatus,
} from '../types/appointment.interface';

class PatientAppointmentController {
  async rescheduleAppointment(req: Request, res: Response, next: NextFunction) {
    const { decryptedData } = req.body;

    const current_appointment_id = decryptedData.current_app_id;
    const open_appointment_id = decryptedData.open_app_id;

    const currentStatus = await AppointmentRepository.checkStatus(
      open_appointment_id
    );

    if (currentStatus === 'BOOKED' || currentStatus === 'CONFIRMED') {
      return res
        .status(400)
        .json({ error: 'Appointment already booked or confirmed' });
    }

    try {
      const appointment_data = await AppointmentRepository.getOne(
        current_appointment_id
      );

      let new_appointment_data;

      if (appointment_data) {
        new_appointment_data = {
          last_name: appointment_data.last_name,
          first_name: appointment_data.first_name,
          email: appointment_data.email,
          open_to_earlier: false,
          isPending: false,
          status: AppointmentStatus.BOOKED,
        };
      }

      await AppointmentRepository.deleteOne(current_appointment_id);

      const newAppointment = await AppointmentRepository.updateOne(
        new_appointment_data as IUpdateAppointmentProps,
        open_appointment_id
      );

      res.json(newAppointment);
    } catch (error) {
      console.error('Error rescheduling appointment:', error);
      res.status(500).json({ error: 'Error rescheduling appointment' });
    }
  }

  async cancelAppointment(req: Request, res: Response, next: NextFunction) {
    const { decryptedData } = req.body;

    const currentStatus = await AppointmentRepository.checkStatus(
      decryptedData.current_app_id
    );

    if (currentStatus === 'CANCELED') {
      return res.status(400).json({ error: 'Appointment already canceled' });
    }

    try {
      const canceledAppointment = await AppointmentRepository.deleteOne(
        decryptedData.current_app_id
      );
      res.json(canceledAppointment);
    } catch (error) {
      console.error('Error deleting appointment:', error);
      res.status(500).json({ error: 'Error canceling appointment' });
    }
  }

  async confirmAppointment(req: Request, res: Response, next: NextFunction) {
    const { decryptedData } = req.body;

    const currentStatus = await AppointmentRepository.checkStatus(
      decryptedData.current_app_id
    );

    if (currentStatus === 'CONFIRMED') {
      return res.status(400).json({ error: 'Appointment already confirmed' });
    }

    try {
      const appointment = await AppointmentRepository.updateStatusToConfirmed(
        decryptedData.current_app_id
      );
      res.json(appointment);
    } catch (error) {
      console.error('Error confirming appointment:', error);
      res.status(500).json({ error: 'Error confirming appointment' });
    }
  }

  async changeOpenToEarlier(req: Request, res: Response, next: NextFunction) {
    const { decryptedData } = req.body;
    try {
      const appointmentOpenToEarlier =
        await AppointmentRepository.changeOpenToEarlier(
          decryptedData.current_app_id,
          false
        );

      res.json(appointmentOpenToEarlier);
    } catch (error) {
      console.error('Error changing open_to_earlier value:', error);
      res.status(500).json({ error: 'Error changing open_to_earlier value' });
    }
  }
}

export default new PatientAppointmentController();

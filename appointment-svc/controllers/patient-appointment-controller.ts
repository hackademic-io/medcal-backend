import { Request, Response, NextFunction, query } from "express";
import AppointmentRepository from "../service/db-service/AppointmentRepository";
import {
  IUpdateAppointmentProps,
  AppointmentStatus,
} from "../types/appointment.interface";
import axios from "axios";

class PatientAppointmentController {
  async rescheduleAppointment(req: Request, res: Response, next: NextFunction) {
    const { decryptedData } = req.body;

    const current_appointment_id = decryptedData.current_app_id;
    const open_appointment_id = decryptedData.open_app_id;

    const currentStatus =
      await AppointmentRepository.checkStatus(open_appointment_id);

    if (
      currentStatus === AppointmentStatus.BOOKED ||
      currentStatus === AppointmentStatus.CONFIRMED
    ) {
      return res
        .status(400)
        .json({ error: "Appointment already booked or confirmed" });
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

      await AppointmentRepository.updateOne(
        new_appointment_data as IUpdateAppointmentProps,
        open_appointment_id
      );

      const responseToNotification = {
        current_appointment_id,
        open_appointment_id,
        status: "confirmed",
      };

      axios.post(
        `${process.env.NOTIFICATION_URL}/notification/rescheduling-confirm`,
        responseToNotification
      );

      res.json({ message: "Reschedule request successfully completed" });
    } catch (error) {
      console.error("Error rescheduling appointment:", error);
      res.status(500).json({
        error:
          "Oops! Something went wrong while processing your request. Please try again later.",
      });
    }
  }

  async rejectRescheduleAppointment(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { decryptedData } = req.body;
    const current_appointment_id = decryptedData.current_app_id;
    const open_appointment_id = decryptedData.open_app_id;

    const open_to_earlier_status = AppointmentRepository.changeOpenToEarlier(
      current_appointment_id,
      false
    );

    if (!open_to_earlier_status) {
      return res.status(400).json({
        error:
          "Oops! We couldn't update your preference to be open to earlier status changes. Please try again later.",
      });
    }

    try {
      const responseToNotification = {
        current_appointment_id,
        open_appointment_id,
        status: "rejected",
      };

      axios.post(
        `${process.env.NOTIFICATION_URL}/notification/rescheduling-reject`,
        responseToNotification
      );
      res.json({ message: "Rejected reschedule request successfully" });
    } catch (error) {
      console.error("Error changing open_to_earlier status:", error);
      res.status(500).json({
        error:
          "Oops! Something went wrong while processing your request. Please try again later.",
      });
    }
  }

  async cancelAppointment(req: Request, res: Response, next: NextFunction) {
    const { decryptedData } = req.body;

    const currentStatus = await AppointmentRepository.checkStatus(
      decryptedData.current_app_id
    );

    if (currentStatus === AppointmentStatus.CANCELED) {
      return res.status(400).json({ error: "Appointment already canceled" });
    }

    try {
      const canceledAppointment = await AppointmentRepository.deleteOne(
        decryptedData.current_app_id
      );
      res.json(canceledAppointment);
    } catch (error) {
      console.error("Error deleting appointment:", error);
      res.status(500).json({
        error:
          "Oops! Something went wrong while processing your request. Please try again later.",
      });
    }
  }

  async confirmAppointment(req: Request, res: Response, next: NextFunction) {
    const { decryptedData } = req.body;

    const currentStatus = await AppointmentRepository.checkStatus(
      decryptedData.current_app_id
    );

    if (currentStatus === AppointmentStatus.CONFIRMED) {
      return res.status(400).json({ error: "Appointment already confirmed" });
    }

    try {
      const appointment = await AppointmentRepository.updateStatusToConfirmed(
        decryptedData.current_app_id
      );
      res.json(appointment);
    } catch (error) {
      console.error("Error confirming appointment:", error);
      res
        .status(500)
        .json({
          error:
            "Oops! Something went wrong while processing your request. Please try again later.",
        });
    }
  }
}

export default new PatientAppointmentController();

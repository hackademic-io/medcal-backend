import { Request, Response, NextFunction, query } from "express";
import AppointmentRepository from "../service/db-service/AppointmentRepository";
import {
  IUpdateAppointmentProps,
  AppointmentStatus
} from "../types/appointment.interface";

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
      console.error("Error fetching all appointments:", error);
      res.status(500).json({ error: "Error fetching all appointments:" });
    }
  }

  async getBooked(req: Request, res: Response, next: NextFunction) {
    let queryMaxDate = req.query.MaxDate as string;
    let queryMinDate = req.query.MinDate as string;

    try {
      const condition = {
        AND: [
          { status: AppointmentStatus.BOOKED },
          {
            date: {
              gte: queryMinDate,
              lt: queryMaxDate
            }
          }
        ]
      };
      const bookedAppointments = await AppointmentRepository.getMany(condition);

      res.json(bookedAppointments);
    } catch (error) {
      console.error("Error fetching booked appointments:", error);
      res.status(500).json({ error: "Error fetching booked appointments:" });
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    const appointment_id = req.params.id;

    try {
      const appointment = await AppointmentRepository.getOne(appointment_id);
      res.json(appointment);
    } catch (error) {
      console.error("Error fetching all appointments:", error);
      res.status(500).json({ error: "Error getting one appointment:" });
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
      console.error("Error updating one appointment:", error);
      res.status(500).json({ error: "Error updating appointment" });
    }
  }

  async createOne(req: Request, res: Response, next: NextFunction) {
    const appointment_data = req.body;

    const validTimes = [
      "08:00 AM",
      "09:00 AM",
      "10:00 AM",
      "01:00 PM",
      "02:00 PM",
      "03:00 PM"
    ];

    if (!validTimes.includes(appointment_data.time)) {
      const validTimeSlots = validTimes.join(", ");
      res.status(500).json({
        error: `Error creating appointment, time should be one of these slots: ${validTimeSlots}`
      });
    }

    try {
      const appointment =
        await AppointmentRepository.createOne(appointment_data);
      res.json(appointment);
    } catch (error) {
      console.error("Error creating appointment:", error);
      res.status(500).json({ error: "Error creating appointment" });
    }
  }

  async deleteOne(req: Request, res: Response, next: NextFunction) {
    const appointment_id = req.params.id;

    const currentStatus =
      await AppointmentRepository.checkStatus(appointment_id);

    if (currentStatus === "CANCELED") {
      return res.status(400).json({ error: "Appointment already canceled" });
    }

    try {
      const canceledAppointment =
        await AppointmentRepository.deleteOne(appointment_id);
      res.json(canceledAppointment);
    } catch (error) {
      console.error("Error deleting appointment:", error);
      res.status(500).json({ error: "Error canceling appointment" });
    }
  }

  async deleteMany(req: Request, res: Response, next: NextFunction) {
    const ignoredIds: string[] = req.body;
    const condition = {
      AND: [{ status: AppointmentStatus.BOOKED }, { id: { in: ignoredIds } }]
    };
    const ignoredAppointments = await AppointmentRepository.getMany(condition);
    const ignoredAppointmentIds = ignoredAppointments.map(
      (appointment) => appointment.id
    );

    try {
      await AppointmentRepository.deleteMany(ignoredAppointmentIds);
      res.status(200);
    } catch (error) {
      console.error("Error deleting appointment:", error);
      res.status(500).json({ error: "Error canceling appointment" });
    }
  }

  async changeIsPending(req: Request, res: Response, next: NextFunction) {
    const appointment_id = req.params.id;
    const is_pending_status = req.body.isPending;

    try {
      const isPendingStatus = await AppointmentRepository.changeIsPendingValue(
        appointment_id,
        is_pending_status
      );
      res.json(isPendingStatus);
    } catch (error) {
      console.error("Error changing isPending value:", error);
      res.status(500).json({ error: "Error changing isPending value" });
    }
  }

  async getAvailableAppointment(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    let queryCurrentDate = req.query.currentDate as string;
    let currentDate = new Date(queryCurrentDate);
    currentDate.setDate(currentDate.getDate());
    const targetDate = new Date(currentDate);
    targetDate.setDate(currentDate.getDate() + 1);

    const condition = {
      open_to_earlier: true,
      isPending: false,
      date: {
        gte: currentDate,
        lte: targetDate
      }
    };

    try {
      const availableAppointment =
        await AppointmentRepository.getAvailableAppointment(condition);
      res.json(availableAppointment);
    } catch (error) {
      res.status(500).json({ error: "Error fetching available appointments" });
    }
  }

  async getCanceledAppointments(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    let queryCurrentDate = req.query.currentDate as string;
    let currentDate = new Date(queryCurrentDate);
    let targetDate = new Date(currentDate);
    targetDate.setDate(currentDate.getDate() + 1);

    const condition = {
      date: {
        gte: currentDate,
        lte: targetDate
      },
      status: AppointmentStatus.CANCELED
    };

    try {
      const canceledAppointments =
        await AppointmentRepository.getMany(condition);
      res.json(canceledAppointments);
    } catch (error) {
      res.status(500).json({ error: "Error fetching open appointments" });
    }
  }
}

export default new AppoinmentController();

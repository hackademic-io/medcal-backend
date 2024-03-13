import { PrismaClient, Prisma, AppointmentStatus } from "@prisma/client";
import {
  IAppointmentProps,
  IUpdateAppointmentProps,
} from "../../types/appointment.interface";

const prisma = new PrismaClient();

class AppointmentRepository {
  async getAll(queryMaxDate: string, queryMinDate: string) {
    let maxDate = new Date(queryMaxDate);
    let minDate = new Date(queryMinDate);

    const appointments = await prisma.appointment.findMany({
      where: {
        AND: [{ date: { gte: minDate } }, { date: { lte: maxDate } }],
      },
    });

    return appointments;
  }

  async getMany(condition: Prisma.AppointmentWhereInput) {
    const appointmentsToConfirm = await prisma.appointment.findMany({
      where: condition,
    });
    return appointmentsToConfirm;
  }

  async getOne(id: string) {
    const appointment = await prisma.appointment.findFirst({
      where: { id },
    });

    return appointment;
  }

  async updateOne(data: IUpdateAppointmentProps, id: string) {
    const appointment = await prisma.appointment.update({
      where: { id },
      data: {
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        open_to_earlier: data.open_to_earlier,
        status: data.status,
      },
    });

    return appointment;
  }

  async createOne(data: IAppointmentProps) {
    const newAppointment = await prisma.appointment.create({
      data: {
        ...data,
      },
    });

    return newAppointment;
  }

  async deleteOne(id: string) {
    const deletedAppointment = await prisma.appointment.update({
      where: { id },
      data: {
        email: null,
        first_name: null,
        last_name: null,
        open_to_earlier: false,
<<<<<<< HEAD
        status: AppointmentStatus.CANCELED,
=======
        status: "CANCELED",
>>>>>>> 876dc63096d2feb739c011b93b62498e521cb669
      },
    });

    return deletedAppointment;
  }

  async deleteMany(ids: string[]) {
    const deletedAppointments = await prisma.appointment.updateMany({
      where: {
        id: {
          in: ids,
        },
      },
      data: {
        email: null,
        first_name: null,
        last_name: null,
        open_to_earlier: false,
<<<<<<< HEAD
        status: AppointmentStatus.CANCELED,
=======
        status: "CANCELED",
>>>>>>> 876dc63096d2feb739c011b93b62498e521cb669
      },
    });

    return deletedAppointments;
  }

  async checkStatus(id: string) {
    const appointmentStatus = await prisma.appointment.findFirst({
      where: { id },
      select: { status: true },
    });

    return appointmentStatus?.status;
  }

  async updateStatusToConfirmed(id: string) {
    const appointmentStatus = await prisma.appointment.update({
      where: { id },
      data: {
        status: AppointmentStatus.CONFIRMED,
      },
    });

    return appointmentStatus?.status;
  }

  async changeOpenToEarlier(id: string, open_to_earlier: boolean) {
    const appointmentOpenToEarlier = await prisma.appointment.update({
      where: { id },
      data: {
        open_to_earlier,
      },
    });

    return appointmentOpenToEarlier;
  }

  async changeIsPendingValue(id: string, isPending: boolean) {
    const isPendingStatus = await prisma.appointment.update({
      where: { id },
      data: {
        isPending,
      },
    });

    return isPendingStatus;
  }

  async getAvailableAppointment(condition: Prisma.AppointmentWhereInput) {
    const availableAppointment = await prisma.appointment.findFirst({
      where: condition,
    });

    if (!availableAppointment) {
      console.log("No available appointment at this time");
    } else {
      return availableAppointment;
    }
  }
}

export default new AppointmentRepository();

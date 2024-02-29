import { PrismaClient } from '@prisma/client';
import {
  IAppointmentProps,
  IUpdateAppointmentProps,
} from '../../types/appointment.interface';

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

  async getMany(condition: Object) {
    const appointmentsToConfirm = await prisma.appointment.findMany({
      where: condition,
    });
    return appointmentsToConfirm
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
        status: 'CANCELED',
      },
    });

    return deletedAppointment;
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
        status: 'CONFIRMED',
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

  async getAvailableAppointment(currentDate: Date) {
    const targetDate = new Date(currentDate);
    targetDate.setDate(currentDate.getDate() + 1);

    const availableAppointment = await prisma.appointment.findFirst({
      where: {
        open_to_earlier: true,
        isPending: false,
        date: {
          gte: currentDate,
          lte: targetDate,
        },
      },
    });

    if (!availableAppointment) {
      console.log('No available appointment at this time');
    }

    return availableAppointment;
  }
}

export default new AppointmentRepository();

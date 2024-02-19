import { PrismaClient } from '@prisma/client';
import { IAppointmentProps } from '../../types/appointment.interface';

const prisma = new PrismaClient();

class AppointmentRepository {
  async getAll() {
    const appointments = await prisma.appointment.findMany();

    return appointments;
  }

  async getOne(id: string) {
    const appointment = await prisma.appointment.findFirst({
      where: { id },
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
        status: 'CANCELED',
      },
    });

    return deletedAppointment;
  }
}

export default new AppointmentRepository();

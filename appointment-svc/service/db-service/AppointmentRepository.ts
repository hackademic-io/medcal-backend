import { PrismaClient } from '@prisma/client';
import { IAppointmentProps } from '../../types/appointment.interface';

const prisma = new PrismaClient();

class AppointmentRepository {
  async getAll() {
    const appointments = await prisma.appointment.findMany();

    return appointments;
  }

  async createOne(data: IAppointmentProps) {
    const newAppointment = await prisma.appointment.create({
      data: {
        ...data,
      },
    });

    return newAppointment;
  }
}

export default new AppointmentRepository();

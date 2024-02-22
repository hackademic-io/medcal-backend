import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class AppointmentRepository {
  async fetchAvailableAppointments() {
    const currentDate = new Date();
    const targetDate = new Date(currentDate);
    targetDate.setDate(currentDate.getDate() + 1);

    const availableAppointments = await prisma.appointment.findMany({
      where: {
        date: {
          gte: currentDate,
          lte: targetDate,
        },
        open_to_earlier: true,
        status: {
          not: 'PENDING',
        },
      },
    });

    return availableAppointments;
  }
}

export default new AppointmentRepository();

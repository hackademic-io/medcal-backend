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

    let pendingAppointment = null;

    if (availableAppointments.length > 0) {
      pendingAppointment = availableAppointments[0];
      await this.markAsPending(pendingAppointment.id);
    }

    return { availableAppointments, pendingAppointment };
  }

  async markAsPending(appointmentId: string) {
    await prisma.appointment.update({
      where: {
        id: appointmentId,
      },
      data: {
        status: 'PENDING',
      },
    });
  }
}

export default new AppointmentRepository();

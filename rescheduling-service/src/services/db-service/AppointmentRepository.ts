import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class AppointmentRepository {
  async fetchAvailableAppointments() {
    // manually inputted the date as March 3, 2024 since our table is populated with March dates but no February. Production code will just be new Date()
    const currentDate = new Date(2024, 2, 8);
    const targetDate = new Date(currentDate);
    targetDate.setDate(currentDate.getDate() + 2);

    const availableAppointments = await prisma.appointment.findMany({
      where: {
        open_to_earlier: true,
        isPending: false,
        date: {
          gte: currentDate,
          lte: targetDate,
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
        isPending: true,
      },
    });
  }
}

export default new AppointmentRepository();

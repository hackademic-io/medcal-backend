import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class AppointmentRepository {
  async fetchAvailableAppointment() {
    // manually inputted the date as March 3, 2024 since our table is populated with March dates but no February. Production code will just be new Date()
    const currentDate = new Date(2024, 2, 8);
    const targetDate = new Date(currentDate);
    targetDate.setDate(currentDate.getDate() + 1);

    //change to find one and add to vlads code
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

    if (availableAppointment) {
      await this.markAsPending(availableAppointment.id);
      console.log(availableAppointment);
    } else {
      console.log('No available appointment at this time');
    }

    return availableAppointment;
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

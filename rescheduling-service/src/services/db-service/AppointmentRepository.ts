import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class AppointmentRepository {
  async fetchAvailableAppointments() {
    try {
      const availableAppointmentsWithOffers = await prisma.appointment.findMany(
        {
          where: { booked: false },
          include: { offer: true },
          orderBy: { date: 'asc' },
        }
      );

      const availableAppointments = availableAppointmentsWithOffers.filter(
        (appointment) => !appointment.offer
      );
      return availableAppointments;
    } catch (error) {
      console.error('Error fetching available appointments', error);
      throw new Error('Unable to fetch available appointments');
    }
  }
}

const appointmentRepository = new AppointmentRepository();
export default appointmentRepository;

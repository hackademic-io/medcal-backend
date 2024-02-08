import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const fetchAvailableAppointments = async () => {
  try {
    const availableAppointments = await prisma.appointment.findMany({
      where: {
        booked: false,
      },
      orderBy: {
        date: 'asc',
      },
    });
    return availableAppointments;
  } catch (error) {
    console.error('Error fetching available appointments', error);
    throw new Error('Unable to fetch available appointments');
  }
};

export default fetchAvailableAppointments;

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const fetchAvailablePatients = async () => {
  try {
    const availablePatients = await prisma.patient.findMany({
      where: {
        opt_in: true,
      },
    });
    return availablePatients;
  } catch (error) {
    console.error('Error fetching available patients', error);
    throw new Error('Unable to fetch available patients');
  }
};

export default fetchAvailablePatients;

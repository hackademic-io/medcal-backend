import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const fetchAvailablePatients = async () => {
  try {
    const optedInPatients = await prisma.patient.findMany({
      where: {
        opt_in: true,
      },
      include: {
        offer: true,
      },
    });
    const availablePatients = optedInPatients.filter(
      (patient) => !patient.offer
    );
    return availablePatients;
  } catch (error) {
    console.error('Error fetching available patients', error);
    throw new Error('Unable to fetch available patients');
  }
};

export default fetchAvailablePatients;

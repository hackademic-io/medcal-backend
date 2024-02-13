import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class OfferRepository {
  async createOffer(appointmentId: string, patientId: string) {
    try {
      const offer = await prisma.offer.create({
        data: {
          appointment_id: appointmentId,
          patient_id: patientId,
          status: 'pending',
        },
      });
      return offer;
    } catch (error) {
      console.error('Error creating offer', error);
      throw new Error('Unable to create offer');
    }
  }
}

const offerRepository = new OfferRepository();
export default offerRepository;

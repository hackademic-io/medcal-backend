import { PrismaClient } from '@prisma/client';
import fetchAvailableAppointments from './appointmentService';
import fetchAvailablePatients from './patientService';

const prisma = new PrismaClient();

const createOffer = async () => {
  try {
    const availableAppointments = await fetchAvailableAppointments();
    const availablePatients = await fetchAvailablePatients();

    if (availableAppointments.length > 0 && availablePatients.length > 0) {
      const selectedAppointment = availableAppointments[0];
      // Insert much better logic to find a patient
      const selectedPatient = availablePatients[0];
      const offer = await prisma.offer.create({
        data: {
          appointment_id: selectedAppointment.id,
          patient_id: selectedPatient.id,
          status: 'pending',
        },
      });

      return offer;
    }
  } catch (error) {
    throw new Error('No available appointments or patients to create an offer');
  }
};

export default createOffer;

import { Request, Response } from 'express';
import { OfferRepository } from '../services/db-service/OfferRepository';
import { AppointmentRepository } from '../services/db-service/AppointmentRepository';
import { PatientRepository } from '../services/db-service/PatientRepository';

export class OfferController {
  private appointmentRepository = new AppointmentRepository();
  private patientRepository = new PatientRepository();
  private offerRepository = new OfferRepository();

  createOffer = async (req: Request, res: Response) => {
    try {
      const availableAppointments =
        await this.appointmentRepository.fetchAvailableAppointments();
      const availablePatients =
        await this.patientRepository.fetchAvailablePatients();

      if (availableAppointments.length > 0 && availablePatients.length > 0) {
        const selectedAppointment = availableAppointments[0];
        // Insert much better logic to find a patient
        const selectedPatient = availablePatients[0];
        const offer = await this.offerRepository.createOffer(
          selectedAppointment.id,
          selectedPatient.id
        );
        return res.json(offer);
      } else {
        res.status(404).json({
          message: 'No available appointments or patients to create an offer',
        });
      }
    } catch (error) {
      console.error('Error creating offer', error);
      res.status(500).json({ message: error.message });
    }
  };
}

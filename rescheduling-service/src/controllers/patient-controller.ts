import { Request, Response } from 'express';
import { PatientRepository } from '../services/db-service/PatientRepository';

export class PatientController {
  private patientRepository = new PatientRepository();

  listAvailablePatients = async (req: Request, res: Response) => {
    try {
      const availablePatients =
        await this.patientRepository.fetchAvailablePatients();
      res.json(availablePatients);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}

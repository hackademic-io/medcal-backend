import { Request, Response } from 'express';
import patientRepository from '../services/db-service/PatientRepository';

export class PatientController {
  listAvailablePatients = async (req: Request, res: Response) => {
    try {
      const availablePatients =
        await patientRepository.fetchAvailablePatients();
      res.json(availablePatients);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}

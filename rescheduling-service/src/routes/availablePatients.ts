import express from 'express';
import fetchAvailablePatients from '../services/patientService';

const router = express.Router();

router.get('/opted-in', async (req, res) => {
  try {
    const availablePatients = await fetchAvailablePatients();
    res.json(availablePatients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

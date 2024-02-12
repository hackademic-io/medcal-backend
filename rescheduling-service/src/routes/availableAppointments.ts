import express from 'express';
import fetchAvailableAppointments from '../services/appointmentService';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const availableAppointments = await fetchAvailableAppointments();
    res.json(availableAppointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

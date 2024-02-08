import express from 'express';
import createOffer from '../services/offerService';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const offer = await createOffer();
    res.json(offer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

import express from 'express';
import availableAppointmentsRouter from './availableAppointments';
import availablePatientsRouter from './availablePatients';
import createOfferRouter from './createOffer';

const router = express.Router();

router.use('/available-appointments', availableAppointmentsRouter);
router.use('/patients', availablePatientsRouter);
router.use('/create-offer', createOfferRouter);

export default router;

// lamar should take appoint 197 in offers

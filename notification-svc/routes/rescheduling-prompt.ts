import express from 'express';
import reschedulingController from '../controllers/reschedulingController';
import hashMiddlware from '../middlewares/hash-middleware';

const reschedulingPromptRoutes = express.Router();

// endpoint for rescheduling-svc to interact with
reschedulingPromptRoutes.post(
  '/rescheduling-prompt',
  reschedulingController.prompt
);

reschedulingPromptRoutes.get(
  '/rescheduling-confirm',
  reschedulingController.confirm
);

reschedulingPromptRoutes.post(
  '/rescheduling-reject',
  hashMiddlware,
  reschedulingController.reject
);

export default reschedulingPromptRoutes;

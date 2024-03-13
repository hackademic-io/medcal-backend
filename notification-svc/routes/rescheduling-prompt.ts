import express from "express";
import reschedulingController from "../controllers/reschedulingController";
import dataValidationMiddlware from "../middlewares/data-validation-middleware";
const reschedulingPromptRoutes = express.Router();

// endpoint for rescheduling-svc to interact with
reschedulingPromptRoutes.post(
  "/rescheduling-prompt",
  reschedulingController.prompt,
);

reschedulingPromptRoutes.post(
  "/rescheduling-confirm",
  dataValidationMiddlware,
  reschedulingController.confirm,
);

reschedulingPromptRoutes.post(
  "/rescheduling-reject",
  dataValidationMiddlware,
  reschedulingController.reject,
);

export default reschedulingPromptRoutes;

import express from "express";
import AppointmentController from "../../../appointment-svc/controllers/appointment-controller";

const router = express.Router();

router.get(
  "/appointments/available",
  AppointmentController.getAvailableAppointment,
);

export default router;

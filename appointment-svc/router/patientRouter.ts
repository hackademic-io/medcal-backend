import { Router } from "express"
import patientAppointmentController from "../controllers/patient-appointment-controller"
import hashMiddlware from "../middlewares/hash-middleware"

const patientRouter = Router()

patientRouter.put(
  "/appointment/reschedule",
  hashMiddlware,
  patientAppointmentController.rescheduleAppointment
)
patientRouter.put(
  "/appointment/reject-reschedule",
  hashMiddlware,
  patientAppointmentController.rejectRescheduleAppointment
)
patientRouter.put(
  "/appointment/confirm",
  hashMiddlware,
  patientAppointmentController.confirmAppointment
)
patientRouter.delete(
  "/appointment/cancel",
  hashMiddlware,
  patientAppointmentController.cancelAppointment
)

export default patientRouter

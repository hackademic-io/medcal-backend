import { Router } from "express";
import patientAppointmentController from "../controllers/patient-appointment-controller";
import hashMiddlware from "../middlewares/hash-middleware";

const patientRouter = Router();

/** PUT Methods */

/**
 * @swagger
 * /appointment/reschedule:
 *   put:
 *     tags:
 *       - Appointment - patient router
 *     summary: Cancel one appointment and reschedule another patient for its place
 *     responses:
 *       200:
 *         description: Reschedule request successfully completed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Reschedule request successfully completed"
 *       400:
 *         description: Appointment already booked or confirmed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Appointment already booked or confirmed"
 *       500:
 *         description: Something went wrong while processing request. Internal error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Oops! Something went wrong while processing your request. Please try again later."
 */
patientRouter.put(
  "/appointment/reschedule",
  hashMiddlware,
  patientAppointmentController.rescheduleAppointment,
);

/**
 * @swagger
 * /appointment/reject-reschedule:
 *   put:
 *     tags:
 *       - Appointment - patient router
 *     summary: Reject reschedule request and notify the parties involved
 *     responses:
 *       200:
 *         description: Rejected reschedule request successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Rejected reschedule request successfully"
 *       400:
 *         description: Something went wrong with updating open_to_earlier status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Oops! We couldn't update your preference to be open to earlier status changes. Please try again later."
 *       500:
 *         description: Something went wrong while processing request. Internal error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Oops! Something went wrong while processing your request. Please try again later."
 */
patientRouter.put(
  "/appointment/reject-reschedule",
  hashMiddlware,
  patientAppointmentController.rejectRescheduleAppointment,
);

/**
 * @swagger
 * /appointment/confirm:
 *   put:
 *     tags:
 *       - Appointment - patient router
 *     summary: Change appointment status to confirm
 *     responses:
 *       200:
 *         description: Confirmed appointment information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "60564fcb544047cdc3844818"
 *                 email:
 *                   type: string
 *                   example: "john.snow@email.com"
 *                 first_name:
 *                   type: string
 *                   example: "John"
 *                 last_name:
 *                   type: string
 *                   example: "Snow"
 *                 open_to_earlier:
 *                   type: boolean
 *                   example: false
 *                 date:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-04-17T12:00:00Z"
 *                 time:
 *                   type: string
 *                   example: "09:00 AM"
 *                 isPending:
 *                   type: boolean
 *                   example: false
 *                 status:
 *                   type: string
 *                   example: "CONFIRMED"
 *       400:
 *         description: Appointment already confirmed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Appointment already confirmed"
 *       500:
 *         description: Something went wrong while processing request. Internal error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Oops! Something went wrong while processing your request. Please try again later."
 */
patientRouter.put(
  "/appointment/confirm",
  hashMiddlware,
  patientAppointmentController.confirmAppointment,
);

/** DELETE Method */

/**
 * @swagger
 * /appointment/cancel:
 *   delete:
 *     tags:
 *       - Appointment - patient router
 *     summary: Change appointment status to canceled
 *     responses:
 *       200:
 *         description: Canceled appointment information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "60564fcb544047cdc3844818"
 *                 email:
 *                   type: string
 *                   example: null
 *                 first_name:
 *                   type: string
 *                   example: null
 *                 last_name:
 *                   type: string
 *                   example: null
 *                 open_to_earlier:
 *                   type: boolean
 *                   example: false
 *                 date:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-04-17T12:00:00Z"
 *                 time:
 *                   type: string
 *                   example: "09:00 AM"
 *                 isPending:
 *                   type: boolean
 *                   example: false
 *                 status:
 *                   type: string
 *                   example: "CANCELED"
 *       400:
 *         description: Appointment already canceled
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Appointment already canceled"
 *       500:
 *         description: Something went wrong while processing request. Internal error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Oops! Something went wrong while processing your request. Please try again later."
 */
patientRouter.delete(
  "/appointment/cancel",
  hashMiddlware,
  patientAppointmentController.cancelAppointment,
);

export default patientRouter;

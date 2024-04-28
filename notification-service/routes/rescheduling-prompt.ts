import express from "express";
import reschedulingController from "../controllers/reschedulingController";
import dataValidationMiddlware from "../middlewares/data-validation-middleware";
const reschedulingPromptRoutes = express.Router();

/**
 * @swagger
 * /rescheduling-prompt:
 *   post:
 *     tags:
 *     - Rescheduling notification router
 *     summary: Send a rescheduling prompt to involved parties.
 *     description: Triggers a process to send a rescheduling prompt to both parties involved in a cancelled appointment.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - offer_appointment_to
 *               - cancelled_appointment
 *             properties:
 *               offer_appointment_to:
 *                 $ref: '#/components/schemas/appointment'
 *               cancelled_appointment:
 *                 $ref: '#/components/schemas/appointment'
 *     responses:
 *       200:
 *         description: Prompt sent successfully and waiting for response.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Prompt handled successfully"
 *       400:
 *         description: Bad request if the data is not properly formatted.
 *       500:
 *         description: Internal server error.
 */

reschedulingPromptRoutes.post(
  "/rescheduling-prompt",
  reschedulingController.prompt,
);

/**
 * @swagger
 * /rescheduling-confirm:
 *   post:
 *     tags:
 *     - Rescheduling notification router
 *     summary: Confirm a rescheduling request.
 *     description: This endpoint confirms a rescheduling request and notifies all involved parties.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - open_appointment
 *               - current_appointment
 *               - status
 *             properties:
 *               open_appointment:
 *                 $ref: '#/components/schemas/appointment'
 *               current_appointment:
 *                 $ref: '#/components/schemas/appointment'
 *               status:
 *                 type: string
 *                 description: Status of the confirmation.
 *                 example: "PENDING"
 *     responses:
 *       200:
 *         description: Confirmation processed successfully.
 *       400:
 *         description: Bad request if the data is not properly formatted.
 *       500:
 *         description: Internal server error.
 */
reschedulingPromptRoutes.post(
  "/rescheduling-confirm",
  dataValidationMiddlware,
  reschedulingController.confirm,
);

/**
 * @swagger
 * /rescheduling-reject:
 *   post:
 *     tags:
 *     - Rescheduling notification router
 *     summary: Reject a rescheduling request.
 *     description: This endpoint rejects a rescheduling request and notifies all involved parties.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - open_appointment
 *               - current_appointment
 *               - status
 *             properties:
 *               open_appointment:
 *                 $ref: '#/components/schemas/appointment'
 *               current_appointment:
 *                 $ref: '#/components/schemas/appointment'
 *               status:
 *                 type: string
 *                 description: Status of the rejection.
 *                 example: "PENDING"
 *     responses:
 *       200:
 *         description: Rejection processed successfully.
 *       400:
 *         description: Bad request if the data is not properly formatted.
 *       500:
 *         description: Internal server error.
 */
reschedulingPromptRoutes.post(
  "/rescheduling-reject",
  dataValidationMiddlware,
  reschedulingController.reject,
);

export default reschedulingPromptRoutes;

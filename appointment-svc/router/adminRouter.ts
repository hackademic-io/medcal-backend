import { Router } from "express";
import appointmentController from "../controllers/appointment-controller";

const adminRouter = Router();

/** POST Methods */

/**
 * @swagger
 * '/appointment':
 *  post:
 *     tags:
 *     - Appointment - admin router
 *     summary: Create a new appointment
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            $ref: "#/components/schemas/createAppointmentBody"
 *     responses:
 *      201:
 *        description: Appointment created successfully!
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: string
 *                  example: "60564fcb544047cdc3844818"
 *                email:
 *                  type: string
 *                  example: "john.snow@email.com"
 *                first_name:
 *                  type: string
 *                  example: "John"
 *                last_name:
 *                  type: string
 *                  example: "Snow"
 *                open_to_earlier:
 *                  type: boolean
 *                  example: true
 *                date:
 *                  type: string
 *                  format: date-time
 *                  example: "2024-04-17T12:00:00Z"
 *                time:
 *                  type: string
 *                  example: "09:00 AM"
 *                isPending:
 *                  type: boolean
 *                  example: true
 *                status:
 *                  type: string
 *                  example: "PENDING"
 *      500:
 *        description: Error creating appointment
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "Error creating appointment"
 */
adminRouter.post("/appointment", appointmentController.createOne);

/** GET Methods */

/**
 * @swagger
 * '/appointment/{id}':
 *  get:
 *     tags:
 *     - Appointment - admin router
 *     summary: Get one appointment
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Appointment ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Appointment information
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
 *                   example: true
 *                 date:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-04-17T12:00:00Z"
 *                 time:
 *                   type: string
 *                   example: "09:00 AM"
 *                 isPending:
 *                   type: boolean
 *                   example: true
 *                 status:
 *                   type: string
 *                   example: "PENDING"
 *       500:
 *         description: Error fetching one appointment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error fetching one appointment"
 */
adminRouter.get("/appointment/:id", appointmentController.getOne);

/**
 * @swagger
 * '/appointment/booked':
 *  get:
 *     tags:
 *     - Appointment - admin router
 *     summary: Get all booked appointments in a date range
 *     parameters:
 *       - in: query
 *         name: MaxDate
 *         schema:
 *           type: string
 *         description: >
 *           Maximum date for filtering appointments (format: YYYY-MM-DD)
 *           This parameter is required.
 *         required: true
 *       - in: query
 *         name: MinDate
 *         schema:
 *           type: string
 *         description: >
 *           Minimum date for filtering appointments (format: YYYY-MM-DD)
 *           This parameter is required.
 *         required: true
 *     responses:
 *       200:
 *         description: Appointments fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "60564fcb544047cdc3844818"
 *                   email:
 *                     type: string
 *                     example: "john.snow@email.com"
 *                   first_name:
 *                     type: string
 *                     example: "John"
 *                   last_name:
 *                     type: string
 *                     example: "Snow"
 *                   open_to_earlier:
 *                     type: boolean
 *                     example: true
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-04-17T12:00:00Z"
 *                   time:
 *                     type: string
 *                     example: "09:00 AM"
 *                   isPending:
 *                     type: boolean
 *                     example: true
 *                   status:
 *                     type: string
 *                     example: "BOOKED"
 *       500:
 *         description: Error fetching booked appointments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error fetching booked appointments"
 */
adminRouter.get("/appointment/booked", appointmentController.getBooked);

/**
 * @swagger
 * '/appointments':
 *  get:
 *     tags:
 *     - Appointments
 *     summary: Get all appointments in a date range
 *     parameters:
 *       - in: query
 *         name: MaxDate
 *         schema:
 *           type: string
 *         description: >
 *           Maximum date for filtering appointments (format: YYYY-MM-DD)
 *           This parameter is required.
 *         required: true
 *       - in: query
 *         name: MinDate
 *         schema:
 *           type: string
 *         description: >
 *           Minimum date for filtering appointments (format: YYYY-MM-DD)
 *           This parameter is required.
 *         required: true
 *     responses:
 *       200:
 *         description: Appointments fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "60564fcb544047cdc3844818"
 *                   email:
 *                     type: string
 *                     example: "john.snow@email.com"
 *                   first_name:
 *                     type: string
 *                     example: "John"
 *                   last_name:
 *                     type: string
 *                     example: "Snow"
 *                   open_to_earlier:
 *                     type: boolean
 *                     example: true
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-04-17T12:00:00Z"
 *                   time:
 *                     type: string
 *                     example: "09:00 AM"
 *                   isPending:
 *                     type: boolean
 *                     example: true
 *                   status:
 *                     type: string
 *                     example: "BOOKED"
 *       500:
 *         description: Error fetching all appointments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error fetching all appointments"
 */
adminRouter.get("/appointments", appointmentController.getAll);

/**
 * @swagger
 * '/appointments/canceled':
 *  get:
 *     tags:
 *     - Appointments
 *     summary: Get all canceled appointments from the current date to the next day.
 *     parameters:
 *       - in: query
 *         name: currentDate
 *         schema:
 *           type: string
 *         description: >
 *           Maximum date for filtering appointments (format: YYYY-MM-DD)
 *           This parameter is required.
 *         required: true
 *     responses:
 *       200:
 *         description: Appointments fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "60564fcb544047cdc3844818"
 *                   email:
 *                     type: string
 *                     example: "john.snow@email.com"
 *                   first_name:
 *                     type: string
 *                     example: "John"
 *                   last_name:
 *                     type: string
 *                     example: "Snow"
 *                   open_to_earlier:
 *                     type: boolean
 *                     example: true
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-04-17T12:00:00Z"
 *                   time:
 *                     type: string
 *                     example: "09:00 AM"
 *                   isPending:
 *                     type: boolean
 *                     example: true
 *                   status:
 *                     type: string
 *                     example: "CANCELED"
 *       500:
 *         description: Error fetching open appointments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error fetching open appointments"
 */
adminRouter.get(
  "/appointments/canceled",
  appointmentController.getCanceledAppointments,
);

/**
 * @swagger
 * '/appointments/avaliable':
 *  get:
 *     tags:
 *     - Appointments
 *     summary: Get all available (open_to_earlier = true, isPending = false) appointments from the current date to the next 2 days.
 *     parameters:
 *       - in: query
 *         name: currentDate
 *         schema:
 *           type: string
 *         description: >
 *           Maximum date for filtering appointments (format: YYYY-MM-DD)
 *           This parameter is required.
 *         required: true
 *     responses:
 *       200:
 *         description: Appointments fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "60564fcb544047cdc3844818"
 *                   email:
 *                     type: string
 *                     example: "john.snow@email.com"
 *                   first_name:
 *                     type: string
 *                     example: "John"
 *                   last_name:
 *                     type: string
 *                     example: "Snow"
 *                   open_to_earlier:
 *                     type: boolean
 *                     example: true
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-04-17T12:00:00Z"
 *                   time:
 *                     type: string
 *                     example: "09:00 AM"
 *                   isPending:
 *                     type: boolean
 *                     example: FALSE
 *                   status:
 *                     type: string
 *                     example: "BOOKED"
 *       500:
 *         description: Error fetching available appointments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error fetching available appointments"
 */
adminRouter.get(
  "/appointments/avaliable",
  appointmentController.getAvailableAppointment,
);

/** PUT Methods */

/**
 * @swagger
 * '/appointment/{id}':
 *  put:
 *     tags:
 *     - Appointment - admin router
 *     summary: Update one appointment
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Appointment ID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/updateAppointmentBody"
 *     responses:
 *       200:
 *         description: Updated appointment information
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
 *                   example: true
 *                 date:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-04-17T12:00:00Z"
 *                 time:
 *                   type: string
 *                   example: "09:00 AM"
 *                 isPending:
 *                   type: boolean
 *                   example: true
 *                 status:
 *                   type: string
 *                   example: "PENDING"
 *       500:
 *         description: Error updating appointment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error updating appointment"
 */
adminRouter.put("/appointment/:id", appointmentController.updateOne);

/**
 * @swagger
 * '/appointment/changePendingStatus/{id}':
 *  put:
 *     tags:
 *     - Appointment - admin router
 *     summary: Update appointment pending status
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Appointment ID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/changeAppointmentPendingStatusBody"
 *     responses:
 *       200:
 *         description: Appointment pending status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isPending:
 *                   type: boolean
 *                   example: false
 *       500:
 *         description: Error changing isPending value
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error changing isPending value"
 */
adminRouter.put(
  "/appointment/changePendingStatus/:id",
  appointmentController.changeIsPending,
);

/** DELETE Methods */

/**
 * @swagger
 * '/appointment/{id}':
 *  delete:
 *     tags:
 *     - Appointment - admin router
 *     summary: Delete (cancel) appointment
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Appointment ID
 *         required: true
 *         schema:
 *           type: string
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
 *                   type: null
 *                   example: null
 *                 first_name:
 *                   type: null
 *                   example: null
 *                 last_name:
 *                   type: null
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
 *       500:
 *         description: Error canceling appointment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error canceling appointment"
 */
adminRouter.delete("/appointment/:id", appointmentController.deleteOne);

/**
 * @swagger
 * '/appointments':
 *  delete:
 *     tags:
 *     - Appointments
 *     summary: Get all available (open_to_earlier = true, isPending = false) appointments from the current date to the next 2 days.
 *     parameters:
 *       - in: query
 *         name: ignoredIds
 *         schema:
 *           type: array
 *           items:
 *            type: string
 *         description: >
 *           Array of ids of patients appointments who didn't answer the confirmation email.
 *           This parameter is required.
 *         required: true
 *     responses:
 *       200:
 *         description: Appointments deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Appointments deleted successfully"
 *       500:
 *         description: Error canceling appointments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error canceling appointments"
 */
adminRouter.delete("/appointments", appointmentController.deleteMany);

export default adminRouter;

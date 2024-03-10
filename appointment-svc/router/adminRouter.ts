import { Router } from "express";
import appointmentController from "../controllers/appointment-controller";

const adminRouter = Router();

adminRouter.get("/appointments", appointmentController.getAll);
adminRouter.get("/appointment/:id", appointmentController.getOne);
adminRouter.get("/appointment/booked", appointmentController.getBooked);
adminRouter.get(
  "/appointments/canceled",
  appointmentController.getCanceledAppointments,
);
adminRouter.get(
  "/appointments/avaliable",
  appointmentController.getAvailableAppointment,
);

adminRouter.post("/appointment", appointmentController.createOne);

adminRouter.put("/appointment/:id", appointmentController.updateOne);
adminRouter.put(
  "/appointment/changePendingStatus/:id",
  appointmentController.changeIsPending,
);

adminRouter.delete("/appointment/:id", appointmentController.deleteOne);

adminRouter.delete("/appointments", appointmentController.deleteMany);

export default adminRouter;

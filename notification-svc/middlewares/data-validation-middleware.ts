import { Request, Response, NextFunction } from "express";
import decryptData from "../utils/decryption";

const dataValidationMiddlware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { open_appointment_id, current_appointment_id, status } = req.body;

  if (!open_appointment_id || !current_appointment_id) {
    return res.status(400).json({ error: "Appointments Id's are missing" });
  }

  if (status !== "rejected" || !status) {
    return res
      .status(400)
      .json({ error: "Status is not 'rejected' or its missing" });
  }
  next();
};

export default dataValidationMiddlware;

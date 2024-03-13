import { Request, Response, NextFunction } from "express";

const dataValidationMiddlware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { current_appointment, open_appointment, status } = req.body;

  if (!current_appointment || !open_appointment) {
    return res.status(400).json({ error: "Appointments are missing" });
  }

  if (!status) {
    return res.status(400).json({ error: "Status is missing" });
  }
  next();
};

export default dataValidationMiddlware;

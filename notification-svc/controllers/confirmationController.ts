import { Response, Request } from "express";
import sendEmail from "../services/sendEmail";
import { IAppointmentProps } from "../types/appointment.interface";
import generateAndShareHash from "../utils/encryption";
require("dotenv").config();

class confirmationController {
  async startCron(req: Request, res: Response) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const twoDaysFromNow = new Date(today);
    twoDaysFromNow.setDate(today.getDate() + 2);

    const threeDaysFromNow = new Date(twoDaysFromNow);
    threeDaysFromNow.setDate(twoDaysFromNow.getDate() + 1);

    const appointmentsToConfirm: IAppointmentProps[] = await fetch(
      `${process.env.APPOINTMENT_BASE_URL}:${process.env.APPOINTMENT_SERVICE_PORT}/appointment/booked?MaxDate=${threeDaysFromNow}&MinDate=${twoDaysFromNow}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error,
        );
      });

    const emailType = "confimation";
    appointmentsToConfirm.forEach((appointment: IAppointmentProps) => {
      const { hash, encryptionIV } = generateAndShareHash(appointment);
      sendEmail(emailType, hash, encryptionIV, appointment);
    });
    const idsToConfirm = appointmentsToConfirm.map(
      (appointment: IAppointmentProps) => appointment.id,
    );
    setTimeout(
      async () => {
        fetch(
          `${process.env.APPOINTMENT_BASE_URL}:${process.env.APPOINTMENT_SERVICE_PORT}/appointments`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              in: idsToConfirm,
            }),
          },
        );
      },
      1000 * 60 * 60 * 2,
    );
  }
}
export default new confirmationController();

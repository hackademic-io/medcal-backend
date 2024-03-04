import cron from "node-cron";
import sendEmail from "./sendEmail";
import { IAppointmentProps } from "../types/appointment.interface";
import generateAndShareHash from "../utils/encryption";

const confirmationJob = () => {
  cron.schedule("0 12 * * *", async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const twoDaysFromNow = new Date(today);
    twoDaysFromNow.setDate(today.getDate() + 2);

    const threeDaysFromNow = new Date(twoDaysFromNow);
    threeDaysFromNow.setDate(twoDaysFromNow.getDate() + 1);

    const appointmentsToConfirm: IAppointmentProps[] = await fetch(
      `http://localhost:3000/appointment/booked?MaxDate=${threeDaysFromNow}&MinDate=${twoDaysFromNow}`,
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
        fetch("http://localhost:3000/appointments", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            in: idsToConfirm,
          }),
        });
      },
      1000 * 60 * 60 * 2,
    );
  });
};

export default confirmationJob;

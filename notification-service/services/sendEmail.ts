import mailjet from "node-mailjet";
import { IAppointmentProps } from "../types/appointment.interface";
import reschedulingEmailHTML from "../views/reschedulingEmail";
import confirmationEmailHTML from "../views/confirmationEmail";

require("dotenv").config();

function sendEmail(
  emailType: string,
  hash: string,
  encryptionIV: string,
  currentAppointment: IAppointmentProps,
  newAppointment?: IAppointmentProps,
) {
  const mailjetConnection =
    process.env.MAILJET_SECRET_KEY &&
    process.env.MAILJET_PUBLIC_KEY &&
    mailjet.apiConnect(
      process.env.MAILJET_PUBLIC_KEY,
      process.env.MAILJET_SECRET_KEY,
    );

  mailjetConnection &&
    mailjetConnection.post("send", { version: "v3.1" }).request({
      Messages:
        emailType === "rescheduling-prompt" && newAppointment
          ? [
              {
                From: {
                  Email: "misha.fomenko00@gmail.com",
                  Name: "Misha (MedCal CEO)",
                },
                To: [
                  {
                    Email: "misha.fomenko00@gmail.com",
                    Name: `${currentAppointment.first_name} ${currentAppointment.last_name}`,
                  },
                ],

                Subject: `Dear ${currentAppointment.first_name} ${currentAppointment.last_name}, we have an earlier appointment available for you on ${newAppointment.date} at ${newAppointment.time}.`,
                TextPart: `Dear ${newAppointment.first_name} ${newAppointment.last_name}`,
                HTMLPart: reschedulingEmailHTML(
                  currentAppointment,
                  newAppointment,
                  hash,
                  encryptionIV,
                ),
              },
            ]
          : [
              {
                From: {
                  Email: "misha.fomenko00@gmail.com",
                  Name: "Misha",
                },
                To: [
                  {
                    Email: "lycakvladislav00@gmail.com",
                    Name: `${currentAppointment.first_name} ${currentAppointment.last_name}`,
                  },
                ],

                Subject: `Dear ${currentAppointment.first_name} ${currentAppointment.last_name}, are you still going to use your appointment on ${currentAppointment.date} at ${currentAppointment.time}?`,
                TextPart: `Dear ${currentAppointment.first_name} ${currentAppointment.last_name}`,
                HTMLPart: confirmationEmailHTML(
                  currentAppointment,
                  hash,
                  encryptionIV,
                ),
              },
            ],
    });
}

export default sendEmail;

import { Response, Request } from "express";
import { reschedulingEventEmitter } from "../utils/customEventEmitters";
import sendEmail from "../services/sendEmail";
import generateAndShareHash from "../utils/encryption";
import publishAppointmentsToQueue from "../services/publishAppointmentsToQueue";
import axios from "axios";

class reschedulingController {
  prompt(req: Request, res: Response) {
    const { currentAppointment, newAppointment } = req.body;
    console.log(
      "Current Appointment:",
      currentAppointment,
      "New Appointment:",
      newAppointment
    );
    let isPending = true;
    const listenerId = `_${currentAppointment.id}_${newAppointment.id}`;

    const { hash, encryptionIV } = generateAndShareHash(
      currentAppointment,
      newAppointment
    );

    const emailType = "rescheduling-prompt";
    sendEmail(
      emailType,
      hash,
      encryptionIV,
      currentAppointment,
      newAppointment
    );

    isPending &&
      reschedulingEventEmitter.once(
        "prompt-handled" + listenerId,
        (message) => {
          res.status(200).send(message);
          isPending = false;
        }
      );
    setTimeout(() => {
      isPending && (reschedulingEventEmitter.emit = () => false);
      isPending && res.status(200).send("expired");
      isPending = false;
    }, 60000);
  }

  confirm(req: Request, res: Response) {
    const { open_appointment, current_appointment, status } = req.body;

    const listenerId = `_${current_appointment.id}_${open_appointment.id}`;

    reschedulingEventEmitter.emit("prompt-handled" + listenerId, status);

    axios.put(
      `${process.env.APPOINTMENT_URL}/appointment/changePendingStatus/${open_appointment.id}`,
      { isPending: false }
    );
  }

  reject(req: Request, res: Response) {
    const { open_appointment, current_appointment, status } = req.body;

    const listenerId = `_${current_appointment.id}_${open_appointment.id}`;

    reschedulingEventEmitter.emit("prompt-handled" + listenerId, status);

    publishAppointmentsToQueue(open_appointment);

    axios.put(
      `${process.env.APPOINTMENT_URL}/appointment/changePendingStatus/${open_appointment.id}`,
      { isPending: false }
    );
  }
}

export default new reschedulingController();

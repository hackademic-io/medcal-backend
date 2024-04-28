import { publishAppointmentsToQueue } from "../service/publishAppointmentsToQueue";
import axios from "axios";
require("dotenv").config();

export async function fetchAndPublishAppointments() {
  const currentDate = new Date();

  const response = await axios.get(
    `${process.env.APPOINTMENT_BASE_URL}:${process.env.APPOINTMENT_SERVICE_PORT}/appointments/canceled?currentDate=${currentDate}`,
  );
  const canceledAppointments = response.data;
  console.log("appointments pulled in cron:", canceledAppointments);

  publishAppointmentsToQueue(canceledAppointments);
}

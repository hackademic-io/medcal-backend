import { publishAppointmentsToQueue } from "../service/publishAppointmentsToQueue";
import axios from "axios";

export async function fetchAndPublishAppointments() {
  const currentDate = new Date().toDateString();

  const response = await axios.get(
    `http://localhost:3001/appointments/canceled?currentDate=${currentDate}`
  );
  const canceledAppointments = response.data;

  publishAppointmentsToQueue(canceledAppointments);
}

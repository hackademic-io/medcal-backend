import { publishAppointmentsToQueue } from "../../appointment-svc/service/publishAppointmentsToQueue";
import axios from "axios";

export async function fetchAndPublishAppointments() {
  const currentDate = new Date().toDateString();
  const response = await axios.get(
    `http://localhost:3000/appointments/canceled?currentDate=${currentDate}`
  );
  const canceledAppointments = response.data;

  publishAppointmentsToQueue(canceledAppointments);
}

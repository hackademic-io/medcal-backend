import { publishAppointmentsToQueue } from '../../appointment-svc/service/publishAppointmentsToQueue';
import AppointmentRepository from '../../appointment-svc/service/db-service/AppointmentRepository';
import 'dotenv/config';

async function fetchAndPublishAppointments() {
  const currentDate = new Date(2024, 2, 7);
  const openAppointments = await AppointmentRepository.getOpenAppointments(
    currentDate
  );
  console.log(openAppointments);
  publishAppointmentsToQueue(openAppointments);
}

fetchAndPublishAppointments();

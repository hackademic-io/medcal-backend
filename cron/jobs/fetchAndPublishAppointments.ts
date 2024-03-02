import { publishAppointmentsToQueue } from '../../appointment-svc/service/publishAppointmentsToQueue';
import AppointmentRepository from '../../appointment-svc/service/db-service/AppointmentRepository';

export async function fetchAndPublishAppointments() {
  const currentDate = new Date(2024, 2, 9);
  const openAppointments = await AppointmentRepository.getOpenAppointments(
    currentDate
  );

  publishAppointmentsToQueue(openAppointments);
}

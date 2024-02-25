import * as amqp from 'amqplib';
import NotificationService from '../services/NotificationService';
import AppointmentRepository from '../services/db-service/AppointmentRepository';

async function consumeAppointmentQueue() {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    const queue = 'appointments';
    await channel.assertQueue(queue, { durable: false });

    console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', queue);

    channel.consume(queue, async (msg) => {
      if (msg !== null) {
        const appointment = JSON.parse(msg.content.toString());

        const id = appointment.id;
        const date = new Date(appointment.date);
        const time = appointment.time;
        const status = appointment.status;

        console.log(
          `Received appointment with id: ${id}, date: ${date}, time: ${time}, status: ${status}`
        );

        channel.ack(msg);

        const { pendingAppointment } =
          await AppointmentRepository.fetchAvailableAppointments();

        if (pendingAppointment) {
          await NotificationService.sendReschedulingPrompt(
            pendingAppointment,
            date
          );
          console.log(pendingAppointment, date);
        }
      }
    });
  } catch (error) {
    console.error('Error consuming messages', error);
  }
}

export { consumeAppointmentQueue };

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

        channel.ack(msg);

        const availableAppointment =
          await AppointmentRepository.fetchAvailableAppointment();

        if (availableAppointment) {
          await NotificationService.sendReschedulingPrompt(
            appointment,
            availableAppointment
          );
        }
      }
    });
  } catch (error) {
    console.error('Error consuming messages', error);
  }
}

export { consumeAppointmentQueue };

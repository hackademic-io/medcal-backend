import * as amqp from 'amqplib';
import { Appointment } from '@prisma/client';

async function publishAppointmentsToQueue(appointments: Appointment[]) {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    const queue = 'appointments';
    await channel.assertQueue(queue, { durable: false });

    appointments.forEach((appointment) => {
      const message = JSON.stringify(appointment);
      channel.sendToQueue(queue, Buffer.from(message));
    });

    console.log('appointments to be filled:', appointments);

    console.log('[x] sent appointments to queue');
  } catch (error) {
    console.error('Error publishing appointments to queue', error);
  }
}

export { publishAppointmentsToQueue };

import * as amqp from "amqplib";
import { IAppointmentProps } from "../types/appointment.interface";

async function publishAppointmentsToQueue(appointment: IAppointmentProps[]) {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    const queue = "appointments";
    await channel.assertQueue(queue, { durable: false });

    const message = JSON.stringify(appointment);
    channel.sendToQueue(queue, Buffer.from(message));

    console.log("[x] sent appointments to queue");
  } catch (error) {
    console.error("Error publishing appointments to queue", error);
  }
}

export default publishAppointmentsToQueue;

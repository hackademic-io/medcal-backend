import * as amqp from "amqplib";
import { IAppointmentProps } from "../types/appointment.interface";
require("dotenv").config();

async function publishAppointmentsToQueue(appointment: IAppointmentProps[]) {
  if (!process.env.RABBITMQ_URL) return;
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
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

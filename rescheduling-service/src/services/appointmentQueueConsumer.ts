import * as amqp from "amqplib";
import NotificationService from "../services/NotificationService";
import axios from "axios";
import { APPOINTMENT_URL } from "../../config";
require("dotenv").config();

async function consumeAppointmentQueue() {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    const queue = "appointments";
    await channel.assertQueue(queue, { durable: false });

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

    channel.consume(queue, async (msg) => {
      if (msg !== null) {
        const appointment = JSON.parse(msg.content.toString());

        channel.ack(msg);

        const currentDate = new Date();
        const availableAppointment = await axios.get(
          `${process.env.APPOINTMENT_BASE_URL}:${process.env.APPOINTMENT_SERVICE_PORT}/appointments/avaliable?currentDate=${currentDate}`,
        );

        if (!availableAppointment.data) {
          throw new Error("Avaliable appointment is not found");
        }

        await axios.put(
          `${process.env.APPOINTMENT_BASE_URL}:${process.env.APPOINTMENT_SERVICE_PORT}/appointment/changePendingStatus/${availableAppointment.data.id}`,
          { isPending: true },
        );

        if (availableAppointment) {
          await NotificationService.sendReschedulingPrompt(
            appointment,
            availableAppointment.data,
          );
        }
      }
    });
  } catch (error) {
    console.error("Error consuming messages", error);
  }
}

export { consumeAppointmentQueue };

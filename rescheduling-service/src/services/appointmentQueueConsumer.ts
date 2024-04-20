import * as amqp from "amqplib";
import NotificationService from "../services/NotificationService";
import axios from "axios";
require("dotenv").config();

async function consumeAppointmentQueue() {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();

    const queue = "appointments";
    await channel.assertQueue(queue, { durable: false });

    await channel.prefetch(1);

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

    channel.consume(queue, async (msg) => {
      if (msg !== null) {
        const appointment = JSON.parse(msg.content.toString());

        const currentDate = new Date();
        const tomorrowDate = new Date(currentDate);
        tomorrowDate.setDate(currentDate.getDate() + 1);

        const availableAppointmentResponse = await axios.get(
          `${process.env.APPOINTMENT_BASE_URL}:${process.env.APPOINTMENT_SERVICE_PORT}/appointments/avaliable?currentDate=${tomorrowDate}`,
        );

        const availableAppointment = availableAppointmentResponse.data;

        if (!availableAppointment) {
          console.error("Avaliable appointment is not found");
          return;
        }

        await axios.put(
          `${process.env.APPOINTMENT_BASE_URL}:${process.env.APPOINTMENT_SERVICE_PORT}/appointment/pending/${availableAppointment.id}`,
          { isPending: true },
        );

        NotificationService.sendReschedulingPrompt(
          appointment,
          availableAppointment,
        );

        channel.ack(msg);
      }
    });
  } catch (error) {
    console.error("Error consuming messages", error);
  }
}

export { consumeAppointmentQueue };

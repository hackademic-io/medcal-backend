import * as amqp from "amqplib";
import NotificationService from "./NotificationService";
import AppointmentRepository from "../../../appointment-svc/service/db-service/AppointmentRepository";

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

        // Will change the static date to the current date in production since db only has March dates
        const availableAppointment =
          await AppointmentRepository.getAvailableAppointment(
            new Date(2024, 2, 15),
          );

        await AppointmentRepository.changeIsPendingValue(
          availableAppointment?.id,
          true,
        );

        if (availableAppointment) {
          await NotificationService.sendReschedulingPrompt(
            appointment,
            availableAppointment,
          );
        }
      }
    });
  } catch (error) {
    console.error("Error consuming messages", error);
  }
}

export { consumeAppointmentQueue };

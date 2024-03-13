import axios from "axios";
import { NOTIFICATION_URL } from "../../config";
require("dotenv").config();

class NotificationService {
  async sendReschedulingPrompt(cancelled_appointment, offer_appointment_to) {
    console.log("cancelled_appointment", cancelled_appointment);
    console.log("appointment_offer_to:", offer_appointment_to);

    const data = {
      offer_appointment_to,
      cancelled_appointment,
    };

    try {
      const response = await axios.post(
        `${process.env.NOTIFICATION_BASE_URL}:${process.env.NOTIFICATION_SERVICE_PORT}/notification/rescheduling-prompt`,
        data,
      );

      console.log("successfully sent msg");

      if (response.status !== 200) {
        console.log(
          "Failed to send rescheduling prompt",
          response.status,
          response.data,
        );
        throw new Error("Failed to send rescheduling prompt");
      }
    } catch (error) {
      console.error("Error sending rescheduling prompt", error.message);

      if (error.response) {
        console.error("Response status", error.response.status);
      }
      throw error;
    }
  }
}

export default new NotificationService();

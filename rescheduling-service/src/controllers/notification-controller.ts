import NotificationService from "../services/NotificationService";

class NotificationController {
  async sendReschedulingPrompt(req, res) {
    const { email, appointmentData } = req.body;

    try {
      await NotificationService.sendReschedulingPrompt(email, appointmentData);
      console.log("Rescheduling prompt sent successfully");
      res.status(200).send("Rescheduling prompt sent successfully");
    } catch (error) {
      console.error("Error sending rescheduling prompt", error);
      res.status(500).send("Error sending rescheduling prompt");
    }
  }
}

export default new NotificationController();

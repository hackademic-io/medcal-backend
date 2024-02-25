const axios = require('axios');

class NotificationService {
  async sendReschedulingPrompt(email, appointmentData) {
    const data = {
      email: email,
      appointment: appointmentData,
    };

    try {
      const response = await axios.post(
        'http://localhost:3001/notification/rescheduling-prompt',
        data
      );

      if (response.status !== 200) {
        console.log(
          'Failed to send rescheduling prompt',
          response.status,
          response.data
        );
        throw new Error('Failed to send rescheduling prompt');
      }
    } catch (error) {
      console.error('Error sending rescheduling prompt, error');
      throw error;
    }
  }
}

export default new NotificationService();

const axios = require('axios');

class NotificationService {
  async sendReschedulingPrompt(appointmentData, pendingAppointment) {
    console.log('appointmentData:', appointmentData);
    console.log('pendingAppointment:', pendingAppointment);

    const data = {
      appointmentData,
      pendingAppointment,
    };

    try {
      const response = await axios.post(
        'http://localhost:3001/notification/rescheduling-prompt',
        data
      );

      console.log('successfully sent msg');

      if (response.status !== 200) {
        console.log(
          'Failed to send rescheduling prompt',
          response.status,
          response.data
        );
        throw new Error('Failed to send rescheduling prompt');
      }
    } catch (error) {
      console.error('Error sending rescheduling prompt', error.message);

      if (error.response) {
        console.error('Response status', error.response.status);
      }
      throw error;
    }
  }
}

export default new NotificationService();

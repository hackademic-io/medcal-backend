const axios = require('axios');

export async function sendReschedulingPrompt(email, appointmentData) {
  const data = {
    email: email,
    appointment: appointmentData,
  };

  try {
    const response = await axios.post(
      'https://localhost:3001/notification/rescheduling-prompt',
      data
    );

    if (response.status === 200) {
      console.log('Rescheduling prompt sent successfully');
    } else {
      console.log(
        'Failed to send rescheduling promp',
        response.status,
        response.data
      );
    }
  } catch (error) {
    console.error('Error sending rescheduling prompt', error);
  }
}

module.exports = { sendReschedulingPrompt };

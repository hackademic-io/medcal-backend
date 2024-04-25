import { IAppointmentProps } from "../types/appointment.interface";
require("dotenv").config();

function confirmationEmailHTML(
  currentAppointment: IAppointmentProps,
  hash: string,
  encryptionIV: string,
): string {
  const html = `<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            max-width: 600px;
            margin: auto;
            background: white;
            padding: 20px;
        }
        .header {
            background-color: #007BFF;
            color: white;
            padding: 10px 20px;
            text-align: center;
            border-radius: 5px 5px 0 0;
        }
        .content {
            line-height: 1.6;
            color: #333;
            padding: 20px;
        }
        .expiration-note {
            color: #FF2D00;
        }
        .btn {
            display: inline-block;
            background-color: white;
            padding: 10px 20px;
            text-align: center;
            text-decoration: none;
            border: 2px solid #04AA6D;
            margin: 10px 0;
            }
        .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 0.8em;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>MedCal Healthcare</h1>
        </div>
        <div class="content">
            <h2>Dear ${currentAppointment.first_name} ${currentAppointment.last_name},</h2>
            <p>We hope this message finds you well. We are reaching out to confirm your upcoming appointment.</p>
            <p><strong>Appointment Details:</strong></p>
            <p>Date: <strong>${new Date(currentAppointment.date).toLocaleDateString()}</strong><br>
            Time: <strong>${currentAppointment.time}</strong></p>
            <p>Please confirm your attendance or cancel if you're unable to make it using the links below:</p>
            <a href="${process.env.FRONTEND_URL}:${process.env.FRONTEND_PORT}/appointment/confirm?hash=${hash}&iv=${encryptionIV}" class="btn">Confirm Appointment</a>
            <a href="${process.env.FRONTEND_URL}:${process.env.FRONTEND_PORT}/appointment/cancel?hash=${hash}&iv=${encryptionIV}"" class="btn">Cancel Appointment</a>
            <p class="expiration-note">Please note, that if you do not confirm your appointment within 24 hours, it will be automatically canceled.</p>
            <p>Your health is our top priority, and we're here to assist you every step of the way.</p>
            <p>Warm regards,</p>
            <p><strong>Misha</strong></p>
        </div>
        <div class="footer">
            <p>MedCal Healthcare<br>Your Partner in Health</p>
        </div>
    </div>
</body>
</html>`;
  return html;
}

export default confirmationEmailHTML;

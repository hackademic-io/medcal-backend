import { IAppointmentProps } from '../types/appointment.interface';

function reschedulingEmailHTML(currentAppointment: IAppointmentProps, newAppointment: IAppointmentProps, hash: string, encryptionIV: string): string {
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
                <p>We are pleased to offer you an earlier appointment opportunity, as we understand the importance of your health and time.</p>
                <p><strong>New appointment Details:</strong></p>
                <p>Date: <strong>${newAppointment.date}</strong><br>
                Time: <strong>${newAppointment.time}</strong></p>
                <p>Please confirm or reject your new appointment using the links below (if you decide to book this appointment, your previous appointment will be automatically canceled):</p>
                <a href="front-end-link?hash=${hash}&iv=${encryptionIV}" class="btn">Book Appointment</a>
                <a href="front-end-link?hash=${hash}&iv=${encryptionIV}" class="btn">Reject Appointment</a>
                <p class="expiration-note">Please note, that this offer is only valid for 2 hours.</p>
                <p>We look forward to serving you and wish you the best in health.</p>
                <p>Warm regards,</p>
                <p><strong>Misha (MedCal CEO)</strong></p>
            </div>
            <div class="footer">
                <p>MedCal Healthcare<br>Bringing Quality Care Closer to You</p>
            </div>
        </div>
    </body>
    </html>
    `
    return html
}

export default reschedulingEmailHTML
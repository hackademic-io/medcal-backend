import mailjet from 'node-mailjet'
import { IAppointmentProps } from '../types/appointment.interface';
require('dotenv').config();

function sendEmail(emailType: string, appointment: IAppointmentProps, hash?: string) {
    const mailjetConnection = process.env.MAILJET_SECRET_KEY && process.env.MAILJET_PUBLIC_KEY && mailjet.apiConnect(process.env.MAILJET_PUBLIC_KEY, process.env.MAILJET_SECRET_KEY);

    mailjetConnection && mailjetConnection.post("send", { 'version': 'v3.1' }).request({
        "Messages":
            emailType === 'rescheduling-prompt'
                ?
                [{
                    "From": {
                        "Email": "misha.fomenko00@gmail.com",
                        "Name": "Misha"
                    },
                    "To": [{
                        "Email": "misha.fomenko00@gmail.com",
                        "Name": "You"
                    }],

                    "Subject": `Dear ${appointment.first_name} ${appointment.last_name}, would you like to take an earlier appointment on ${appointment.date} at ${appointment.time}.`,
                    "TextPart": "My first Mailjet email",
                    "HTMLPart": `<h3>Dear patient, welcome to MedCal!</h3><br />
            We wish you get better asap!<br /><br />
            <a href="http://localhost:3001/notification/rescheduling-confirm" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; border-radius: 5px;">Confirm</a><br /><br />
            <a href="http://localhost:3001/notification/rescheduling-reject" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; border-radius: 5px;">Reject</a><br /><br />`

                }]
                :
                [{
                    "From": {
                        "Email": "misha.fomenko00@gmail.com",
                        "Name": "Misha"
                    },
                    "To": [{
                        "Email": "misha.fomenko00@gmail.com",
                        "Name": "You"
                    }],

                    "Subject": `Dear ${appointment.first_name} ${appointment.last_name}, are you still going to use your appointment on ${appointment.date} at ${appointment.time}?`,
                    "TextPart": "My first Mailjet email",
                    "HTMLPart": `<h3>Dear patient, welcome to MedCal!</h3><br />
                We wish you get better asap!<br /><br />
                <a href="link-to-be-determined" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; border-radius: 5px;">Confirm</a><br /><br />
                <a href="link-to-be-determined" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; border-radius: 5px;">Cancel</a><br /><br />`

                }]
    });
}

export default sendEmail

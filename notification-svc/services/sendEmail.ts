import mailjet from 'node-mailjet'
import { IAppointmentProps } from '../types/appointment.interface';
require('dotenv').config();

function sendEmail(emailType: string, hash: string, encryptionIV: string, currentAppointment: IAppointmentProps, newAppointment?: IAppointmentProps) {
    const mailjetConnection = process.env.MAILJET_SECRET_KEY && process.env.MAILJET_PUBLIC_KEY && mailjet.apiConnect(process.env.MAILJET_PUBLIC_KEY, process.env.MAILJET_SECRET_KEY);

    mailjetConnection && mailjetConnection.post("send", { 'version': 'v3.1' }).request({
        "Messages":
            emailType === 'rescheduling-prompt' && newAppointment
                ?
                [{
                    "From": {
                        "Email": "misha.fomenko00@gmail.com",
                        "Name": "Misha (MedCal CEO)"
                    },
                    "To": [{
                        "Email": "misha.fomenko00@gmail.com",
                        "Name": `${currentAppointment.first_name} ${currentAppointment.last_name}`
                    }],

                    "Subject": `Dear ${currentAppointment.first_name} ${currentAppointment.last_name}, we have an earlier appointment available for you on ${newAppointment.date} at ${newAppointment.time}.`,
                    "TextPart": `Dear ${newAppointment.first_name} ${newAppointment.last_name}`,
                    "HTMLPart": `<h3>Dear patient, welcome to MedCal!</h3><br />
            We wish you get better asap!<br /><br />
            <a href="front-end-link?hash=${hash}&iv=${encryptionIV}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; border-radius: 5px;">Confirm</a><br /><br />
            <a href="front-end-link?hash=${hash}&iv=${encryptionIV}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; border-radius: 5px;">Reject</a><br /><br />`

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

                    "Subject": `Dear ${currentAppointment.first_name} ${currentAppointment.last_name}, are you still going to use your appointment on ${currentAppointment.date} at ${currentAppointment.time}?`,
                    "TextPart": "My first Mailjet email",
                    "HTMLPart": `<h3>Dear patient, welcome to MedCal!</h3><br />
                We wish you get better asap!<br /><br />
                <a href="link-to-be-determined" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; border-radius: 5px;">Confirm</a><br /><br />
                <a href="link-to-be-determined" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; border-radius: 5px;">Cancel</a><br /><br />`

                }]
    });
}

export default sendEmail

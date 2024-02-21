import mailjet from 'node-mailjet'
require('dotenv').config();

function sendEmail(msg: string) {
    const mailjetConnection = process.env.MAILJET_SECRET_KEY && process.env.MAILJET_PUBLIC_KEY && mailjet.apiConnect(process.env.MAILJET_PUBLIC_KEY, process.env.MAILJET_SECRET_KEY);

    mailjetConnection && mailjetConnection.post("send", { 'version': 'v3.1' }).request({
        "Messages": [{
            "From": {
                "Email": "misha.fomenko00@gmail.com",
                "Name": "Misha"
            },
            "To": [{
                "Email": "misha.fomenko00@gmail.com",
                "Name": "You"
            }],
            "Subject": `${msg}`,
            "TextPart": "My first Mailjet email",
            "HTMLPart": `<h3>Dear patient, welcome to MedCal!</h3><br />
            We wish you get better asap!<br /><br />
            <a href="http://localhost:3001/notification/rescheduling-confirm" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; border-radius: 5px;">Confirm</a><br /><br />
            <a href="http://localhost:3001/notification/rescheduling-reject" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; border-radius: 5px;">Reject</a><br /><br />`
        }]
    });
}

export default sendEmail

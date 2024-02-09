const mailjet = require('node-mailjet')
require('dotenv').config();

function sendEmail(msg) {
    const mailjetConnection = mailjet.apiConnect(process.env.MAILJET_PUBLIC_KEY, process.env.MAILJET_SECRET_KEY);

    mailjetConnection.post("send", { 'version': 'v3.1' }).request({
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
            "HTMLPart": "<h3>Dear patient, welcome to <p>MedCal</p>!</h3><br />We wish you get better asap!"
        }]
    });
}

module.exports = sendEmail

import nodemailer, { Transporter } from 'nodemailer';

class MailService {
  private transporter: Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }
  async sendActivationMail(to: string, link: string) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: 'Account activation on ' + process.env.API_URL,
      text: '',
      html: `
        <div>
          <h1>For activation follow the link</h1>
          <a href="${process.env.API_URL}/user/activate/${link}">Click here!</a>
        </div>
      `,
    });
  }
}

export default new MailService();

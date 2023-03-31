import nodemailer, { Transporter } from 'nodemailer';

const sendEmail = async (
  host: string,
  sender: string,
  service: string,
  user: string,
  pass: string,
  email: string,
  subject: string,
  html: string
) => {
  try {
    const transport: Transporter = nodemailer.createTransport({
      host: host,
      service: service,
      port: 578,
      secure: true,
      auth: {
        user: user,
        pass: pass,
      },
    });

    await transport.sendMail({
      from: sender,
      to: email,
      subject: subject,
      replyTo: null!, // or an email address that is not monitored
      html: html,
    });
    console.log('email sent successfully');
    return { message: 'Email sent. Check your email for activation.' };
  } catch (e) {
    console.log('email not sent');
    console.log(e);
    return e;
  }
};

export default sendEmail;

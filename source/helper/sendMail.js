import { createTransport } from 'nodemailer';
import { EMAIL_USER, EMAIL_PASS } from '../config/global.js';

export default function confirmEmail(email, subject, html) {
  const transporter = createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS
    }
  });

  const mailOptions = {
    from: EMAIL_USER,
    to: email,
    subject: subject,
    html: html
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

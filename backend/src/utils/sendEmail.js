// backend/utils/sendEmail.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendBookingEmail({ to, name, serviceName, dateTime, address }) {
  const mailOptions = {
    from: `"Hyperlocal" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Booking Confirmed ✔",
    text: `Hi ${name},

Your booking for "${serviceName}" has been confirmed.

📅 Date & Time: ${dateTime}
📍 Address: ${address}

Thank you for choosing HyperLocal!
`,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = { sendBookingEmail };

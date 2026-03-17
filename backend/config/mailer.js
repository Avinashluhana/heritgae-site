const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

const sendNotification = async (submission) => {
  if (!process.env.SMTP_USER || !process.env.NOTIFY_EMAIL) return;
  await transporter.sendMail({
    from: `"Heritage Site" <${process.env.SMTP_USER}>`,
    to: process.env.NOTIFY_EMAIL,
    subject: `New Submission: ${submission.title}`,
    html: `
      <h2>New Heritage Site Submission</h2>
      <p><strong>Title:</strong> ${submission.title}</p>
      <p><strong>Type:</strong> ${submission.type}</p>
      <p><strong>Volunteer:</strong> ${submission.volunteer.name} (${submission.volunteer.email})</p>
      <p><strong>Location:</strong> ${submission.location.address || `${submission.location.lat}, ${submission.location.lng}`}</p>
      <p><strong>Donation:</strong> $${submission.donation.amount}</p>
    `,
  });
};

module.exports = { sendNotification };

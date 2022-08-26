const nodemailer = require("nodemailer");
require("dotenv").config({ path: "./config.env" });
const sendEmail = (options) => {
  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    from: "app@erkenci.me",
    tls: { rejectUnauthorized: false },
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: options.to,
    subject: options.subject,
    html:
      options.text +
      "<p>This email was send from an unmonitored email address..",
    replyTo: process.env.EMAIL_REPLY || null,
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

module.exports = sendEmail;

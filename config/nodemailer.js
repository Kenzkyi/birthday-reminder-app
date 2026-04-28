require("dotenv").config();
// import nodemailer from "nodemailer";
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // The code from Google
  },
});
exports.sendBirthdayEmail = async function (recipientEmail, name) {
  const mailOptions = {
    from: `"Birthday Bot" ${process.env.EMAIL_USER}`,
    to: recipientEmail,
    subject: `Happy Birthday, ${name}! 🎉`,
    html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Happy Birthday!</title>
  <style>
    /* Reset and base styles */
    body { margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9f9f9; }
    
    /* Container for the email */
    .email-container { width: 100%; max-width: 600px; margin: 20px auto; background-color: #ffffff; border: 1px solid #e0e0e0; }
    
    /* Header Styles */
    .header { background-color: #6a5acd; padding: 40px 20px; text-align: center; color: #ffffff; }
    
    /* Content Styles */
    .content { padding: 40px 30px; text-align: center; color: #444444; }
    .birthday-icon { font-size: 50px; margin-bottom: 20px; }
    
    /* Footer Styles */
    .footer { padding: 20px; text-align: center; font-size: 12px; color: #aaaaaa; border-top: 1px solid #eeeeee; }
  </style>
</head>
<body>
  <table border="0" cellpadding="0" cellspacing="0" class="email-container">
    <tr>
      <td class="header">
        <h1 style="margin: 0; font-size: 28px;">Happy Birthday!</h1>
      </td>
    </tr>
    
    <tr>
      <td class="content">
        <div class="birthday-icon">🎂</div>
        <h2 style="margin-top: 0; color: #333;">Hello ${name},</h2>
        <p style="font-size: 18px; line-height: 1.6;">
          Wishing you a fantastic birthday today! 
        </p>
        <p style="font-size: 16px; line-height: 1.6; color: #666;">
          May this year bring you joy, new opportunities, and plenty of reasons to smile. 
          Enjoy your special day to the fullest!
        </p>
      </td>
    </tr>

    <tr>
      <td class="footer">
        <p>You received this message because your birthday was registered in our reminder system.</p>
      </td>
    </tr>
  </table>
</body>
</html>`,
  };

  try {
    console.log("lets give it a try right");
    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

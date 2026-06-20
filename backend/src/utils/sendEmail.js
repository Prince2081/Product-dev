const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const message = {
      from: `"AI Solution Security" <${process.env.EMAIL_USER}>`, // sender address
      to: options.email, // list of receivers
      subject: options.subject, // Subject line
      text: options.message, // plain text body
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; text-align: center; background-color: #f8fafc;">
          <div style="background-color: white; padding: 40px; border-radius: 10px; max-width: 500px; margin: 0 auto; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h2 style="color: #0A2540;">Admin Login Verification</h2>
            <p style="color: #64748b; font-size: 16px;">Use the following 6-digit code to complete your login securely.</p>
            <div style="font-size: 32px; font-weight: bold; letter-spacing: 4px; color: #0284c7; margin: 30px 0;">
              ${options.code}
            </div>
            <p style="color: #64748b; font-size: 14px;">This code will expire in 10 minutes. If you did not request this, please secure your account immediately.</p>
          </div>
        </div>
      `,
    };

    let info = await transporter.sendMail(message);

    console.log("================================================");
    console.log("Email sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    console.log("================================================");
    console.log("FOR TESTING PURPOSES, THE OTP IS: ", options.code);
    console.log("================================================");

  } catch (err) {
    console.error("Error sending email:", err);
  }
};

module.exports = sendEmail;

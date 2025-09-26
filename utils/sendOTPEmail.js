import nodemailer from 'nodemailer';

export const sendOTPEmail = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.verify();

    const mailOptions = {
      from: `"VerifyMe App" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: '🔐 Your OTP Code',
      text: `Your OTP code is: ${otp}\n\nIt will expire in 5 minutes.\n\nDo not share this code with anyone.`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ OTP email sent to ${email}: ${info.response}`);
  } catch (error) {
    console.error(`❌ Error sending OTP email to ${email}:`, error?.message || error);
    throw new Error('Email service failed'); 
  }
};

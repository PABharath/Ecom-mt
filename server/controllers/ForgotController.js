// controllers/ForgotController.js
const nodemailer = require('nodemailer');
const generateOTP = require('generate-otp');
const UserModel = require('../models/userModel');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'nitinkaroshi34@mail.com', // Replace with your Gmail email
    pass: 'ellszlffumkmoov', // Replace with your Gmail password
  },
});

const generateResetToken = () => generateOTP.generate({ length: 6, digits: true, symbols: false, alphabets: false });

const sendForgotPasswordEmail = async (email, resetToken) => {
  const mailOptions = {
    from: 'nitinkaroshi34@mail.com', // Replace with your Gmail email
    to: email,
    subject: 'Password Reset',
    text: `Click the following link to reset your password: http://localhost:3000/reset-password/${resetToken}`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Error sending email');
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    console.log('Received email:', email);

    // Check if the email exists in the database (you might want to add more validation)
    const user = await UserModel.findOne({ email });

    if (user) {
      const resetToken = generateResetToken();
      user.resetPasswordToken = resetToken;
      user.resetPasswordTokenExpiration = new Date(new Date().getTime() + 10 * 60 * 1000); // Set the reset token expiration time (e.g., 10 minutes)
      await user.save();

      await sendForgotPasswordEmail(email, resetToken);

      res.status(200).json({ message: 'Reset token sent successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error in forgotPassword:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const verifyResetToken = async (req, res) => {
  const { email, resetToken } = req.body;

  try {
    const user = await UserModel.findOne({
      email,
      resetPasswordToken: resetToken,
      resetPasswordTokenExpiration: { $gt: new Date() },
    });

    if (user) {
      res.status(200).json({ message: 'Reset token is valid' });
    } else {
      res.status(400).json({ error: 'Invalid reset token or token expired' });
    }
  } catch (error) {
    console.error('Error in verifyResetToken:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { forgotPassword, verifyResetToken };

const transporter = require('../models/emailModel');

const sendEmail = async (req, res) => {
    const { to, subject, text } = req.body;

    const mailOptions = {
        from: 'bharathkumar2981@gmail.com',
        to: to,
        subject: subject,
        text: text
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send email!' });
    }
};

module.exports = {
    sendEmail
};

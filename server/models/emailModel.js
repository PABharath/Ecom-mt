const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'bharathkumar2981@gmail.com',
        pass: 'geke picf dasx hpgx'
    }
});

module.exports = transporter;

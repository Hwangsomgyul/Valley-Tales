const nodemailer = require('nodemailer');

const { mailServiceEmail, mailServicePassword } = require('../config');

const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: mailServiceEmail,
        pass: mailServicePassword,
    }
});

const sendEmail = async (to, subject, text) => {
    const message = {
        from: mailServiceEmail,
        to,
        subject,
        text,
    };
    const info = await transport.sendMail(message);
    return info;
}

module.exports = sendEmail;
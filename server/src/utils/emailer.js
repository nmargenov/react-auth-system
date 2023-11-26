const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'niki.margenov@gmail.com',
        pass: 'iypw ujxh dvcn wqhs'
    }
});

// Email content
// const mailOptions = {
//     from: 'nikolay_margenov@abv.bg',
//     to: 'nikolay_margenov@yahoo.com',
//     subject: 'New password',
//     text: 'Blabababbaba this is your new password.'
// };

// Send the email

export default transporter


const nodemailer = require('nodemailer');

exports.otpMailsender = async (mailOptions) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER_NAME,
                pass: process.env.EMAIL_USER_PASSWORD
            }
        });

        let result = await transporter.sendMail(mailOptions);
        console.log("Success Mail Send", result.response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
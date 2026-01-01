const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/', (req, res) => {
    const { email, message} = req.body;
    
    // Create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sangv906@gmail.com', // generated ethereal user
            pass: 'uqac zvfi myyt cmsw' // generated ethereal password / password app on google
        }
    });
    // Set up email content
    const mailOptions = {
        from: 'sangv906@gmail.com',
        to: `${email}`,
        subject: 'Thông báo',
        text: message
    }

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Send email failed');
        } else {
            console.log('Email sent successfully:' + info.response);
            res.status(200).send('Send email successfully');
        }
    });
});

module.exports = router;
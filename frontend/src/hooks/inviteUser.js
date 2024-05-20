import express from 'express'
import nodemailer from 'nodemailer'

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'yourgmail@gmail.com', // Your Gmail address
        pass: 'yourpassword' // Your Gmail password or application-specific password if you have 2-factor authentication enabled
    }
});

app.get('/sendEmail', (req, res) => {
    const mailOptions = {
        from: 'connect.siwc@gmail.com',
        to: 'recipient@example.com',
        subject: 'Subject of the email', // Subject line
        text: 'Body of the email' // Plain text body
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error occurred:', error);
            res.status(500).send('Error occurred while sending email.');
        } else {
            console.log('Email sent:', info.response);
            res.send('Email sent successfully.');
        }
    });
});

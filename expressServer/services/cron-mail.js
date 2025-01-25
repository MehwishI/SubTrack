const cron = require('node-cron');>
const nodemailer = require('nodemailer');



// ...

// Create mail transporter.
let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: 'mydev0819@gmail.com',
    pass: 'Hehe4986902!!'
  }
});

// ...

// Sending emails every Monday.
cron.schedule('8 15 * * 1', function() {
  console.log('---------------------');
  console.log('Running Cron Job');

  let messageOptions = {
    from: 'mydev0819@gmail.com',
    to: 'mydev0819@gmail.com',
    subject: 'Scheduled Email from SUBTrack',
    text: 'Hi there. This email was automatically sent by us.'
  };

  transporter.sendMail(messageOptions, function(error, info) {
    if (error) {
      throw error;
    } else {
      console.log('Email successfully sent!');
    }
  });
});
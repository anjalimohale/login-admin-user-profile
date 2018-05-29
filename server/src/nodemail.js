var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var transporter = nodemailer.createTransport(smtpTransport({
  service: 'gmail',
  auth: {
    user: 'mohale.anjali@gmail.com',
    pass: 'Anjali@123'
  }
}));

var mailOptions = {
  from: 'mohale.anjali@gmail.com',
  to: 'mohale.anjali@gmail.com',
  subject: 'Sending Email using Node.js[nodemailer]',
  html: '<h1>Welcome</h1><a href="http://localhost:4200/reset-password">That was easy!</a>'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
}); 

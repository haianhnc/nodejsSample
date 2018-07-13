exports.transportMail = function() {
  console.log('transporting...');

  var nodemailer = require('nodemailer');

  var transporter = nodemailer.createTransport( {
    service: 'gmail',
      auth: {
        user: 'haianhspn@gmail.com',
        pass: 'kill2213'
      },
    },
  );

  var mailOptions = {
    from: 'haianhspn@gmail.com',
    to: 'haianhnc@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };

  transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
}
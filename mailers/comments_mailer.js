const nodeMailer=require('../config/nodemailer');

// This is the another way for exporting a method
exports.newComment=(comment) =>{
    console.log('inside newComment mailer',comment);
    nodeMailer.transporter.sendMail({
        from: 'sonu3@gmail.com',
        to: comment.user.email,
        subject: "New comment published!",
        html: '<h1>Yup, your comment is now published <h1>'
    },(err, info) =>{
        if(err){
            console.log('Error in sending mail', err);
            return;
        }
        console.log('Message send',info);
        return;
    });
}
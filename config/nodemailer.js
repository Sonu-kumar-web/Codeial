const nodemailer=require('nodemailer');
const ejs=require('ejs');
const path=require('path');

let transporter=nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    post: 587,
    source: false,
    auth: {
        user: 'sonu2nd36600@gmail.com',  // this email and password must be correct
        pass: '9838389368'
    }
});

let renderTemplate=(data, relativePath) =>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err, template){
            if(err){
                console.log('Error in rendering template', err);
                return;
            }
            mailHTML=template;
        }
    )
    return mailHTML;
}

module.exports={
    transporter: transporter,
    renderTemplate: renderTemplate
}
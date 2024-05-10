const nodemailer = require('nodemailer');
const mailgen = require('mailgen');
require ('dotenv').config();

let transporter = nodemailer.createTransport({
    service:'Gmail',
    secure:true,
    auth:{
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
    }
});

const registerEmail = async(userEmail, user) => {
    try{
        const emailToken = user.generateRegisterToken();

        let mailGenerator = new mailgen({
            theme:'default',
            product:{
                name:"MyAmazon",
                link:`${process.env.EMAIL_MAIN_URL}`
            }
        });

        const email = {
            body:{
                name:userEmail,
                intro:"Welcome to MyAmazon!",
                action:{
                    instructions:"To get validate your account, please click here:",
                    button:{
                        color:"#1a73e8",
                        text:"Validate your account",
                        link:`${process.env.EMAIL_MAIN_URL}verification?t=${emailToken}`
                    }
                }
            }
        }

        let emailBody = mailGenerator.generate(email);
        let message = {
            from: process.env.EMAIL,
            to:userEmail,
            subject:"Welcome to MyAmazon",
            html:emailBody
        };

        await transporter.sendMail(message);
        
        return true

    }catch(error){
        throw error
    }
}

module.exports = {
    registerEmail
}
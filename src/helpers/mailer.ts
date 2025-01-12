import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs'
import User from '@/models/userModel';
import { dbconnect } from '@/dbConnect/dbConnect';



export const sendEmail = async({email, emailTypes , userId} : any)=>{
    try {
      // todo: configure mail for usage
     await dbconnect()

      const hashedToken = await bcryptjs.hash(userId.toString(),10)

      if(emailTypes === 'VERIFY'){
          await User.findByIdAndUpdate(userId ,
           { $set: {
              verifyToken: hashedToken,
              verifyTokenExpire: Date.now()+3600000
            }})

      }else if (emailTypes === 'RESET'){
        await User.findByIdAndUpdate(userId , 
          {$set:{forgotPasswordToken: hashedToken,
            forgotPasswordTokenExpire: Date.now()+3600000
          }})
      }
        // Looking to send emails in production? Check out our Email API/SMTP product!

        // we went to mailtrap.io and created an account and got the following credentials-> create new inbox -> smtp settings

     const transport = nodemailer.createTransport({
    // host: "sandbox.smtp.mailtrap.io",
    // port: 2525,
    // auth: {
    //   user: "45da6817d0b761",  // ❌
    //   pass: "0b640c3028dff7"  // ❌
    //   }
     
    // service: 'gmail',
    host : process.env.HOST,
    service : process.env.SERVICES,
    port : Number(process.env.PORT),
    secure : Boolean(process.env.SECURE),

    auth: {
        user: process.env.USER, // Your Gmail address
        pass: process.env.PASSWORD, // App Password here
    },

    });
         
     const veriftHtml = `<p>Click <a href =${process.env.DOMAIN}/verifyemail?token=${hashedToken}>here</a> to verify your email or copy and paste the link below in your browser.<br>${process.env.DOMAIN}/verifyemail?token=${hashedToken}</P>` 

     const resetHtml = `<p>Click <a href =${process.env.DOMAIN}/resetpassword?token=${hashedToken}>here</a> to reset your password or copy and paste the link below in your browser.<br>${process.env.DOMAIN}/resetpassword?token=${hashedToken}</P>`


         const MailOptions = {
            from: 'usha500210@gmail.com', 
            to: email, 
            subject: emailTypes === "VERIFY" ? 'Verify your email' : 'Reset your password', 
            html: emailTypes === "VERIFY" ? veriftHtml : resetHtml
          }
           const mailResponse = await transport.sendMail(MailOptions)

           return mailResponse

    } catch (error: any) {
        console.error('Error in sendMail:', error);
        throw new Error(error.message)
    }
}
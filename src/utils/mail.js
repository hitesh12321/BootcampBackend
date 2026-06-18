const Mailgen = require("mailgen");
const nodemailer = require("nodemailer");



const sendEmail = async (options) => {
  const mailGenerator =   new Mailgen({

        theme : "default",
        product :{
            name : "Task Manager App",
            link : "https://taskmanagerapplink.com"
        }

    })

    const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);
    const emailHtml = mailGenerator.generate(options.mailgenContent);

    const transporter = nodemailer.createTransport({
  host: process.env.MAIL_TRAP_SMPT_HOST,
  port: process.env.MAIL_TRAP_SMPT_PORT,
//   secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: process.env.MAIL_TRAP_SMPT_USER,
    pass: process.env.MAIL_TRAP_SMPT_PASS,
  },
})

const mail = {
    from : "mail.taskmanager@example.com",
    to : options.email,
    subject : options.subject,
    text : emailTextual,
    html : emailHtml

}
try {
    await transporter.sendMail(mail);
    console.log("Email sent successfully");
} catch (error) {
        console.error("Error sending email, make sure you provided all mail trap credentials in .env file:", error);
}


}


const emailverificationContent = (username , verificationUrl)=> {
   return {
     body: {
        name: username,
        intro: 'Welcome to Mailgen! We\'re very excited to have you on board.',
        action: {
            instructions: 'To get started with Mailgen, please click here:',
            button: {
                color: '#70eaa5ff', // Optional action button color
                text: 'Confirm your account',
                link: verificationUrl
            }
        },
        outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
    }
    
   }
};

const PasswordResetMailgenContent = (username , verificationUrl)=> {
   return {
     body: {
        name: username,
        intro: 'We got request to reset the password of your account',
        action: {
            instructions: 'To reset your password, please click here:',
            button: {
                color: '#70a5eaff', // Optional action button color
                text: 'Reset Password',
                link: verificationUrl
            }
        },
        outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
    }
    
   }
};

module.exports = {

    emailverificationContent,
    PasswordResetMailgenContent,
    sendEmail

}


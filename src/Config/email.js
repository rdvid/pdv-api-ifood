import nodemailer from 'nodemailer'
// import config from './mailConfig'

const Transporter = nodemailer.createTransport({
    host: "in-v3.mailjet.com",
    port: 587,
    user: "750dd747505faf5eedbc4fd31ee926fe",
    pass: "e245c0f2702db6d78dd063ab4416cf20"
})

export { Transporter }

// class Mail {

//     constructor(
//         public to?: string, //para quem esta sendo enviado
//         public subject?: string, // titulo do e-mail
//         public message?: string) { } // corpo do e-mail


//     sendMail() {

//         let mailOptions = {
//             from: "wladimir12oliveira@gmail.com",
//             to: this.to,
//             subject: this.subject,
//             html: this.message
//         }

//         const transporter = nodemailer.createTransport({
//             host: config.host,
//             port: config.port,
//             secure: false,
//             auth: {
//                 user: config.user,
//                 pass: config.password
//             },
//             tls: { rejectUnauthorized: false }
//         })


//         console.log(mailOptions);

//         transporter.sendMail(mailOptions, function (error, info) {
//             if (error) {
//                 return error;
//             } else {
//                 return "E-mail enviado com sucesso!";
//             }
//         });
//     }


// }

// export default new Mail;



// const transportador = nodemailer.createTransport({
//     host: process.env.EMAIL_HOST,
//     port: process.env.EMAIL_PORT,
//     auth: {
//         user: process.env.EMAIL_USER,
//         PASS: process.env.EMAIL_PASS,
//     }
// })

// export {
//     transportador
// }
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');


const {EMAIL, PASSWORD} = require('../env.js');
/*send mail from testing account*/
const signup = async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Crear un objeto Mailgen
    const mailGenerator = new Mailgen({
        theme: 'default',
        product: {
            name: 'Moises Carrillo',
            link: 'https://mailgen.js/'
        }
    });

    // Configurar el contenido del correo
    const emailContent = {
        body: {
            name: name,
            intro: 'Your Information have been delivered',
            table: {
                data: [
                    {
                        descripción: `<strong>Name:</strong> ${name}<br>
                                      <strong>Email:</strong> ${email}<br>
                                      <strong>Subject</strong> ${subject}<br>
                                      <strong>message:</strong> ${message}`,
                    }
                ]
            },
            outro: 'We will get in touch soon'
        }
    };

    // Generar el correo electrónico
    const emailBody = mailGenerator.generate(emailContent);

    // Configurar el transporte de nodemailer
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: EMAIL, // Your Gmail email address
            pass: PASSWORD // Your Gmail password
        }
    });

    // Configurar las opciones del correo
    const mailOptions = {
        from: {
            address: 'moosescn20@gmail.com',// Dirección de correo electrónico del remitente
            name: 'Moises Carrillo' // Nombre del remitente
        },
        to: `${email}`,
        bcc: 'moosescn20@gmail.com',
        subject: 'New message from Moises Carrillo',
        html: emailBody
    };
    

    // Enviar el correo electrónico
    transporter.sendMail(mailOptions)
        .then((info) => {
            return res.status(201).json({
                msg: '¡Message sent successfully!',
                info: info.messageId,
                preview: nodemailer.getTestMessageUrl(info)
            });
        })
        .catch(error => {
            return res.status(500).json({ error });
        });
};



module.exports = {
    signup,
    
}

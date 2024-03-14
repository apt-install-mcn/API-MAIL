const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');


const {EMAIL, PASSWORD} = require('../env.js');
/*send mail from testing account*/
const signup = async (req, res) => {
    const { name, email, subject } = req.body;

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
            intro: 'Tu información ha sido recibida con éxito',
            table: {
                data: [
                    {
                        descripción: `<strong>Nombre:</strong> ${name}<br>
                                      <strong>Correo electrónico:</strong> ${email}<br>
                                      <strong>Teléfono:</strong> ${subject}`,
                    }
                ]
            },
            outro: 'Nos comunicaremos pronto'
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
        from: 'moosescn20@gmail.com',
        to: `${email}`,
        cc: 'moosescn20@gmail.com',
        subject: 'Nuevo mensaje de Moises Carrillo',
        html: emailBody
    };

    // Enviar el correo electrónico
    transporter.sendMail(mailOptions)
        .then((info) => {
            return res.status(201).json({
                msg: '¡Mensaje enviado con éxito!',
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

const moongose = require('mongoose');
const nodemailer = require('nodemailer');
const { handleError } = require('../utils/errorHandler.js');

const { MAIL, PASSWORD } = require('../config/env.config');

// Variable "reutilizable" de transporte para envio de mensajes
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, 
    auth: {
        user: MAIL,
        pass: PASSWORD,
        }
});

/**
 * @name enviarEmail
 * @description Funcion para enviar correos a traves de nodemailer a un destinatario con un asunto y un texto
 * @param {String} to - Correo del destinatario
 * @param {String} subject - Asunto del correo
 * @param {String} text - Texto del correo
 */
async function enviarEmail(to, subject, text) {
    try {
        const mailOptions = {
            from: MAIL,
            to,
            subject,
            text
        };
        console.log("Enviando correo...");
        const info = await transporter.sendMail(mailOptions);
    } catch (error) {
        handleError(error, "nodemailer.service -> enviarEmail")
    }
}
module.exports = { enviarEmail };
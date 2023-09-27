import nodemailer from "nodemailer";
import { options } from "../config/options.config.js";

const transporter = nodemailer.createTransport({
    service:"gmail",
    port:587,
    auth:{
        user: options.gmail.emailAdmin,
        pass: options.gmail.emailPass
    },
    secure:false,
    tls:{
        rejectUnauthorized:false
    }
});
//Mail de recupero de contraseña
export const sendRecoveryPass = async (userEmail,token)=>{
    console.log(userEmail, token)
    const link = `http://localhost:8080/reset-password?token=${token}`;
    await transporter.sendMail({
        from: options.gmail.emailAdmin,
        to:userEmail,
        subject:"Restablecer contraseña",
        html: `
        <div>
        <h2>Has solicitado un cambio de contraseña.</h2>
        <p>Da clic en el siguiente enlace para restableces la contraseña</p>
        <a href="${link}">
        <button> Restablecer contraseña </button>
        </a>        
        </div>
        `
    })
};

//Mail de aviso de producto eliminado

export const sendProductDelete = async (uEmail, product)=>{
    await transporter.sendMail({
        from: options.gmail.emailAdmin,
        to: uEmail,
        subject: 'Producto eliminado',
        html: `
        <div>
        <h1>Se eliminó un producto que creaste</h1>
        <h2>${product.title}</h2>
        </div>       `
    });
};
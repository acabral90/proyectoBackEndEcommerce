import passport from 'passport';
import { userRepoService } from '../repository/index.js';
import { generateEmailToken, validatePassword, verifyEmailToken, createHash } from '../utils.js';
import { sendRecoveryPass } from '../utils/email.js'
import userModel from '../dao/models/user.js';

export const failRegisterController = async (req,res)=>{
    
    req.logger.error('Register failed')
    res.send({error: 'Error en el registro'})
};

export const failLoginController =  async (req,res)=>{
    
    req.logger.error('Login failed')
    res.send({error: 'Error en el ingreso'})
};

export const logoutController = (req,res)=>{
    
    req.session.destroy(err =>{
        if(err) return res.status(500).send({status:"error", error:"No pudo cerrar sesion"});
        req.logger.info('Session cerrada correctamente');
        res.redirect('/');
    })
};

export const currentController = async (req, res)=>{
    try{
        req.logger.info(req.session.user)
        const user = await userRepoService.getUserRepository(req.session.user);
        res.status(200).send({status: 'success', payload: user})
    }catch (error){
        res.status(400).send({status: 'error', error: 'Error al buscar usuario'})
    }
};

export const passportGithubController = passport.authenticate('github', {scope:['user:email']});

export const passportGithubCallbackController = passport.authenticate('github',{failureRedirect:'/'});

export const githubCallbackController = async (req,res)=>{
    
    req.session.user = req.user;
    req.logger.info('Login success')
    res.redirect('/products')

};

export const passportRegisterController = passport.authenticate('register', { failureRedirect:'/failRegister'});

export const registerController = async (req, res) =>{

    req.logger.info('User registered')
    res.send({status:"success", message:"User registered"});

};

export const loginController = async (req,res)=>{
    console.log(req.user)
    if(!req.user) return res.status(400).send({status:"error", error: 'Invalid credentials'});

    req.session.user = {
        first_name : req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email
    }

    req.logger.info('Login success');

    res.send({status:"success", payload:req.user, message:"Primer logueo!!"})
};

export const passportLoginController = passport.authenticate('login');

export const forgotPasswordController = async (req,res)=>{
    try {
        const { email } = req.body;
        console.log(email)
        const user = await userModel.findOne({email:email})
        req.logger.warning(user)
        if(!user){
            req.logger.warning("El usuario no existe")
            return res.send(`<div>Error1, <a href="/forgot-password">Intente de nuevo</a></div>`)
        }
        const token = generateEmailToken(email,3600);
        console.log(token)
        const sendEmail = await sendRecoveryPass(email,token);
        console.log(sendEmail)
        res.send("Se envio un correo a su cuenta para restablecer la contraseña, volver  <a href='/'>al login</a>")
    } catch (error) {
        return res.send(`<div>Error2, <a href="/forgot-password">Intente de nuevo</a></div>`)
    }
};

export const resetPasswordController = async (req,res)=>{
    try {
           const token = req.query.token;
           const { email, newPassword } = req.body;
           
           const validEmail = verifyEmailToken(token) 
           if(!validEmail){
            return res.send(`El enlace ya no es válido, genere uno nuevo: <a href="/forgot-password">Nuevo enlace</a>.`)
           }
           const user = await userModel.findOne({email:email});
           if(!user){
            return res.send("El usuario no esta registrado.")
           }
           if(validatePassword(newPassword,user)){
            return res.send("No puedes usar la misma contraseña.")
           }
           const userData = {
            ...user._doc,
            password:createHash(newPassword)
           };
           const userUpdate = await userModel.findOneAndUpdate({email:email},userData);
           res.send(`La contraseña se actualizó correctamente. Volver <a href="/">al login</a>`)

    } catch (error) {
        res.send(error.message)
    }
};

export const userPremiumController = async (req, res)=>{
    try {
        const userId = req.params.uid;
        const user = await userModel.findById(userId);
        const userRol = user.role;
        if(userRol === "user"){
            user.role = "premium"
        } else if(userRol === "premium"){
            user.role = "user"
        } else {
            return res.json({status:"error", message:"no es posible cambiar el role del usuario"});
        }
        await userModel.updateOne({_id:user._id},user);
        res.send({status:"success", message:"rol modificado"});
    } catch (error) {
        console.log(error.message);
        res.json({status:"error", message:"hubo un error al cambiar el rol del usuario"})
    }
}
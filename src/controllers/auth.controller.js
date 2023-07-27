import passport from 'passport';
import { userRepoService } from '../repository/index.js';

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
        res.send({status: 'success', payload: user})
    }catch (error){
        res.send({status: 'error', error: 'Error al buscar usuario'})
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

export const passportLoginController = passport.authenticate('login')
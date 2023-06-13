import { Router } from 'express';
import userModel from '../dao/models/user.js';
import passport from 'passport';

const router = Router();

router.get('/failregister', async (req,res)=>{
    console.log('Fallo en el registro');
    res.send({error: 'Error en el registro'})
})

router.get('/faillogin', async (req,res)=>{

    console.log('Fallo en el ingreso');
    res.send({error: 'Error en el ingreso'})

})

router.get('/logout', (req,res)=>{
    req.session.destroy(err =>{
        if(err) return res.status(500).send({status:"error", error:"No pudo cerrar sesion"})
        res.redirect('/');
    })
})

router.get('/github', passport.authenticate('github', {scope:['user:email']}), async (req,res)=>{})

router.get('/githubcallback', passport.authenticate('github',{failureRedirect:'/'}), async (req,res)=>{

    req.session.user = req.user;
    res.redirect('/')

})

router.get('/current', async (req, res)=>{

    console.log(req.session.user)

    res.send({payload: req.session.user})
})

router.post('/register', passport.authenticate('register', { failureRedirect:'/failRegister'} ),async (req, res) =>{

    res.send({status:"success", message:"User registered"});

})

router.post('/', passport.authenticate('login'), async (req,res)=>{

    if(!req.user) return res.status(400).send({status:"error", error: 'Invalid credentials'});

    req.session.user = {
        first_name : req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email
    }

    res.send({status:"success", payload:req.user, message:"Primer logueo!!"})
})

export default router;
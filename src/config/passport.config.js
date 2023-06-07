import passport from 'passport';
import local from 'passport-local';
import userService from '../dao/models/user.js';
import {createHash, validatePassword } from '../utils.js';
import GitHubStrategy from 'passport-github2';

const LocalStrategy = local.Strategy;

const initializePassport = () => {
    
    passport.use('register', new LocalStrategy({ passReqToCallback:true, usernameField:'email'}, async (req,username,password,done) =>{
            const {first_name, last_name, email, age } = req.body;
            
            try {
                let user = await userService.findOne({email:username});
                if(user){
                    console.log('El usuario ya existe');
                    return done(null,false);
                }
                const newUser = {
                        first_name,
                        last_name,
                        email,
                        age,
                        password: createHash(password) 
                }
                let result = await userService.create(newUser);

                return done(null, result);

            } catch (error) {
                return done("Error al obtener el usuario: " + error)
            }
        }
    ));

    passport.serializeUser((user,done)=>{
        done(null, user._id)
    });
    passport.deserializeUser( async (id , done)=>{
        let user = await userService.findById(id);
        done(null, user)
    });

    passport.use('login', new LocalStrategy({usernameField:'email'}, async (username, password, done)=>{

        try {
           const user = await userService.findOne({email:username})
           //console.log(user);
            if(!user){
                console.log('No existe el usuario');
                return done(null, false);
            }
            if(!validatePassword(password,user)) return done (null, false);
            return done(null,user);

        } catch (error) {
            return done("Error al intentar ingresar: " + error);    
        }

    }))

    passport.use('github', new GitHubStrategy({
        clientID: 'Iv1.082f639bfb951b1a',
        clientSecret:'caa111e3e85d87f77db4a74840f5866ea0082b62',
        callbackURL: 'http://localhost:8080/api/session/githubcallback'

    }, async (accessToken, refreshToken,profile,done)=>{
        try {
            
            console.log(profile); 

            let user = await userService.findOne({email: profile._json.email})
            if(!user){

                const email = profile._json.email == null ?  profile._json.username : null;

                const newUser = {
                        first_name: profile._json.name,
                        last_name:'',
                        email: email,
                        age: 18,
                        password: '',
                }
                const result = await userService.create(newUser);
                done(null,result)
            }else{
                
                done(null, user)
            }

        } catch (error) {
            return done(null,error)
        }
    }))
}
export default initializePassport;
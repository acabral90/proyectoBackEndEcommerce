import {fileURLToPath} from 'url';
import bcrypt from 'bcrypt';
import { Faker, en } from '@faker-js/faker';
import jwt from 'jsonwebtoken';
import path from 'path';
import { options } from './config/options.config.js';
import multer from 'multer';


//bcrypt
export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const validatePassword = (password, user) => bcrypt.compareSync(password, user.password);

//faker
export const customFaker = new Faker({
    locale: [en]
});

const { commerce, database, string } = customFaker;

export const generateProduct = ()=> {
    return {
        _id: database.mongodbObjectId(),
        title: commerce.productName(),
        description: commerce.productDescription(),
        price: parseFloat(commerce.price()),
        stock: parseInt(string.numeric(2)),
        category: commerce.department(),
    }
}


//__dirname

export const __dirname = path.dirname(fileURLToPath(import.meta.url));

//Email token

export const generateEmailToken = (email, expireTime)=>{
    console.log(email)
    const token = jwt.sign({email}, options.gmail.emailToken, {expiresIn:expireTime})
    console.log(token)
    return token
};

export const verifyEmailToken = (token) =>{
    try {
        const info = jwt.verify(token,options.gmail.emailToken);
        return info.email;
    } catch (error) {
        console.log(error.message)
        return null
    }
};

//Multer

//configuracion para guardar imagenes de usuarios
const validFields = (body) => {
    const {name, email, password} = body;
    console.log(body)
    if(!name || !email || !password){
        return false;
    }else{
        return true;
    }
};

//filtro para validar los campos de cargar la imagen
const multerFilterProfile = (req,file,cb)=>{
    const isValid = validFields(req.body);
    if(isValid){
        cb(null,true)
    }else{
        cb(null,false)
    }
}

//Configuración para guardar la foto de perfil del usuario
const profileStorage = multer.diskStorage({
    //donde guardo los archivos
    destination: function(req,file,cb) {
      cb(null,path.join(__dirname,"/multer/users/profiles"))  
    },
    //el nombre del archivo que estamos guardando
    filename: function (req,file,cb) {
        
        cb(null,`${req.body.email}-perfil-${file.originalname}`)
    }
})
//Creamos el uploader de multer
export const uploaderProfile = multer({ storage: profileStorage })


//Configuracion para guardar documentos de los usuarios
const documentStorage = multer.diskStorage({
    destination: function(req,file,cb) {
        cb(null,path.join(__dirname,"/multer/users/documents"));
    },
    filename: function(req,file,cb) {
        console.log("req.body")
        console.log(req.user.email)
        console.log("req.body")
        cb(null,`${req.user.email}-document-${file.originalname}`);
    }
})
//creamos el uploader
export const uploaderDocument = multer({storage:documentStorage});


//configuracion para guardar imagenes de productos
const productStorage = multer.diskStorage({
    destination: function(req,file,cb) {
        cb(null,path.join(__dirname,"/multer/products"));
    },
    filename: function(req,file,cb) {
        
        cb(null,`${req.body.code}-image-${file.originalname}`);
    }
})
export const uploaderProduct = multer({storage:productStorage})             
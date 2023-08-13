import {fileURLToPath} from 'url';
import bcrypt from 'bcrypt';
import { Faker, en } from '@faker-js/faker';
import jwt from 'jsonwebtoken';
import path from 'path';
import { options } from './config/options.config.js';


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
}

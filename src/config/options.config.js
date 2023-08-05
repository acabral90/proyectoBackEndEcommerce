import * as dotenv from 'dotenv';
import { __dirname } from '../utils.js';
import path from "path";
import { Command } from 'commander';

const program = new Command();

program
.option("-mode <modo>", "Modo de inicio","dev") 
program.parse();

const environment = program.opts();

console.log(environment);

const pathEnvironment = environment.Mode === "prod" ? path.join(__dirname, "../.env.production") : path.join(__dirname, "../.env.development");

dotenv.config({path: pathEnvironment});

export const options = {
    mongoDB:{
        url:process.env.MONGO_URL
    },
    server:{
        port: process.env.PORT,
        secretSession: process.env.SECRET_SESSION
    },
    gmail:{
        emailToken:process.env.SECRET_TOKEN_EMAIL,
        emailAdmin:process.env.EMAIL_ADMIN,
        emailPass:process.env.EMAIL_PASSWORD
    }
}
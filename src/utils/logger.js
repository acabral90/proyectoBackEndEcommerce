import winston from "winston";
import * as dotenv from "dotenv";
import { __dirname } from "../utils.js"
import path from "path";
dotenv.config();

const customLevelsOptions = {
    levels:{
       fatal: 0,
       error: 1,
       warning: 2,
       info: 3,
       debug: 4 
    },
    colors:{
        fatal: 'red',
        error: 'magenta',
        warning: 'yellow',
        info: 'blue',
        debug: 'white',
    }
}

const devLogger = winston.createLogger({
    levels:customLevelsOptions.levels,
    transports:[
        new winston.transports.Console({
            level: 'debug',
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelsOptions.colors }),
                winston.format.simple()
            )
        })
    ]
});

const prodLogger = winston.createLogger({
    levels: customLevelsOptions.levels,
    transports: [
        new winston.transports.Console({level: 'info'}),
        new winston.transports.File({
            filename: path.join(__dirname,'./logs/errores.log'), 
            level: 'warning',
            format: winston.format.simple()
        })
    ]
})

const currentEnv = process.env.NODE_ENV || "development";

//midlleware
export const addLogger = (req,res,next)=>{
    if(currentEnv === "development"){
        req.logger = devLogger;
    } else {
        req.logger = prodLogger;
    }
    req.logger.info(`${req.url} - method: ${req.method}`);
    next();
}
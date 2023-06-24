import dotenv from 'dotenv';
dotenv.config();

export const options = {
    mongoDB:{
        url:process.env.MONGO_URL
    },
    server:{
        port: process.env.PORT,
        secretSession: process.env.SECRET_SESSION
    }
}
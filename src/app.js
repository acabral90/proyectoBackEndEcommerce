import express from "express";
import mongoose from "mongoose";

import handlebars from 'express-handlebars';
import { Server } from "socket.io";


import __dirname from "./utils.js";
import viewRouter from "./routes/views.router.js";

import  methodOverride  from "method-override";
 

const PORT = 8080;
const MONGO = 'mongodb+srv://acabral:acabral@cluster0.sx9b4ns.mongodb.net/?retryWrites=true&w=majority'

const app = express();
const connection = mongoose.connect(MONGO);

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(methodOverride('_method'));

app.use(express.static(__dirname+'/public'));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine', 'handlebars');



app.use('/', viewRouter);

const server =  app.listen(PORT, ()=>{
    console.log(`servidor funcionando en el puerto: ${PORT}`)
})

const socketServerIO = new Server(server);

socketServerIO.on('connection', socket =>{
    console.log('Usuario conectado')

    socket.on('message', data=>{
        console.log(data);
    })

    socketServerIO.emit('evento_para_todos', 'Este mensaje lo reciben todos los sockets conectados')

})




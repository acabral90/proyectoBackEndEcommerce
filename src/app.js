import express from "express";
import mongoose from "mongoose";

import handlebars from 'express-handlebars';
import { Server, Socket } from "socket.io";


import __dirname from "./utils.js";
import viewRouter from "./routes/views.router.js";
import cartsRouter from "./routes/carts.router.js"

import  methodOverride  from "method-override";

import ChatManager from "./dao/manager/chatManager.js";
 

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
app.use('/api/carts', cartsRouter)

const server =  app.listen(PORT, ()=>{
    console.log(`servidor funcionando en el puerto: ${PORT}`)
})

const io = new Server(server);
const chatManager = new ChatManager();

io.on('connection', Socket =>{
    console.log('Usuario conectado')

    Socket.on('message', async data=>{
        //console.log(data);

        await chatManager.createMessage(data)

        let messages = await chatManager.getMessages();

        //console.log(messages)

        io.emit('messageLogs', messages)

    })

    io.emit('evento_para_todos', 'Este mensaje lo reciben todos los sockets conectados')

})




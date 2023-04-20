import express from "express";
import handlebars from 'express-handlebars';
import { Server } from "socket.io";

import __dirname from "./utils.js";
import viewRouter from "./routes/views.router.js";

const PORT = 8080;

const app = express();

app.use(express.static(__dirname+'/public'));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

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




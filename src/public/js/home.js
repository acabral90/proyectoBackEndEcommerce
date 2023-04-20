const socket = io();

socket.emit('message', 'Hola, me estoy comunicando desde un websocket');

socket.on('evento_para_todos', data =>{
    console.log(data);
})
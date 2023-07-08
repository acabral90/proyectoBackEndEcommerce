
const Socket = io();

const chatbox = document.querySelector('#chatbox');
const user = document.querySelector('#user').textContent
/*Swal.fire({
    title: "Identifícate",
    input: "text",
    inputValidator: (value) =>{
        return !value && "Necesita escribir el nombre de usuario para iniciar!"
    },
    allowOutsideClick: false,
    toast: true 
}).then(result =>{
    user = result.value;
})*/

chatbox.addEventListener('keyup', evt =>{
    
    console.log(evt);
    
    if(evt.key === "Enter"){
        if(chatbox.value.trim().length>0){
            Socket.emit('message', {user:user, message: chatbox.value.trim()});
            
            chatbox.value = "";
        }
    }
})

Socket.on('messageLogs', data =>{

    console.log(data)

    let log = document.getElementById('messageLogs');
    let messages = "";

    data.forEach(message => {
        messages +=  `${ message.user } dice: ${ message.message } <br/>  `       
    });
    log.innerHTML = messages
    console.log(messages)
})

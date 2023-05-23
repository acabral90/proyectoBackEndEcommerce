
//const Socket = io();
//let user;

//const chatbox = document.getElementById('chatbox');

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
})

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

    if(!user) return;

    let log = document.getElementById('messageLogs');
    let messages = "";

    data.forEach(message => {
        messages +=  `${ message.user } dice: ${ message.message } <br/>  `       
    });
    log.innerHTML = messages
})

//Funcion del evento para agregar un producto al carrito

//async function addToCart() {

    //if (typeof document !== 'undefined'){
        const btnAddToCart = document.getElementById('addToCart');
        const productId = document.getElementById('productId');

        btnAddToCart.addEventListener('click', evt => {
            console.log(evt)
            const id = productId.textContent.substring(3);
            console.log(id)
            
        });
 //   }      
//}

//export default addToCart;*/

    document.getElementById('addToCart').addEventListener('click', function() {
        // Datos a enviar al servidor
        const productId = document.getElementById('productId');
        
        const id = productId.textContent.substring(3);
        const data = { message: 'Hola servidor' };
  
        // Configurar la solicitud
        const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        };
  
        // Realizar la solicitud al servidor
        fetch('/products', options)
        .then(response => response)
        .then(responseData => {
            // Manejar la respuesta del servidor
            console.log(responseData);
        })
        .catch(error => {
            // Manejar errores
            console.error(error);
        });
  });
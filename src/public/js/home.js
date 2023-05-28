
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
})*/




//Funcion del evento para agregar un producto al carrito

let currentCartId = null;

const addToCartButton = document.querySelector("#addToCart");

addToCartButton.addEventListener("click", async (event) => {

event.preventDefault();

if (!currentCartId) {

    const cartResponse = await fetch("api/carts", { method: "GET" });

    const cartData = await cartResponse.json();
    
    console.log(cartData)
    
    currentCartId = cartData.respuesta[0]._id
    
    console.log( {currentCartId} );
    
}

const productId = document.querySelector("#productId").textContent.substring(3);

console.log({ productId });

const updateResponse = await fetch(`/${currentCartId}/product/${productId}`, { method: "POST" });
console.log(updateResponse)

});


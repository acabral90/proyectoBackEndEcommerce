
//Funcion del evento para agregar un producto al carrito

let currentCartId = null;

const addToCartButton = document.querySelectorAll("#addToCart");

addToCartButton.forEach((button) =>{
    button.addEventListener("click", async (event) =>{ 
        event.preventDefault();

        const card = event.target.parentNode.parentNode

        if (!currentCartId) {

            const cartResponse = await fetch("api/carts", { method: "GET" });
            const cartData = await cartResponse.json();
        
            console.log(cartData)
        
            currentCartId = cartData.respuesta[0]._id
        
            console.log( {currentCartId} );
        
        }

        const productId = card.querySelector("#productId").textContent.substring(3);

        console.log({ productId });

        const updateResponse = await fetch(`/${currentCartId}/product/${productId}`, { method: "PUT" });
    
        console.log(updateResponse)
    });
});










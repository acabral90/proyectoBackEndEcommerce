
//Funcion del evento para agregar un producto al carrito

let currentCartId = null;
const addToCartButton = document.querySelectorAll("#addToCart");
console.log(addToCartButton)

addToCartButton.forEach((button) =>{
    button.addEventListener("click", async (event) =>{ 
        //event.preventDefault();

        const card = event.target.parentNode.parentNode
        console.log(card)

        if (!currentCartId) {
            const cartResponse = await fetch("api/carts/:cid", { method: "GET" });
            console.log(cartResponse)
            const cartData = await cartResponse.json();        
            console.log(cartData)        
            currentCartId = cartData.respuesta._id        
            console.log( {currentCartId} );        
        }

        const productId = card.querySelector("#productId").textContent.substring(3);
        console.log({ productId });
        const updateResponse = await fetch(`api/carts/${currentCartId}/product/${productId}`, { method: "PUT" });    
        console.log(updateResponse)
    });
});










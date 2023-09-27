//Funcion para sumar los precios de los productos del carrito

let products = document.querySelectorAll('.cartProductContainer')
console.log(products)
let total = 0        
let subtotal = document.querySelector('#subtotal')

products.forEach((product)=>{
    console.log(product)
    const quantity = product.querySelector('.productQuantity').textContent.substring(9)
    const price = product.querySelector('.productPrice').textContent.substring(1)
    total += price*quantity
})

subtotal.innerHTML = total

//Finalizar compra

const finalizarCompra = document.querySelector('#finalizarCompra');

finalizarCompra.addEventListener('click', async (event)=>{
    event.preventDefault();

    const cartResponse = await fetch('/api/carts/:cid', {method: 'GET'});
        const data = await cartResponse.json();
        const cart_id = data.respuesta._id
        console.log(data)

    Swal.fire({
        title: 'Queres finalizar la compra?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'SI!'
      }).then( async (result)=>{
        if (result.isConfirmed) {
            
            const purchaseResponse = await fetch(`/api/carts/${cart_id}/purchase`, {method: 'POST'});
            console.log(purchaseResponse);
            const data = await purchaseResponse.json();
            console.log(data)
            const ticket_code = data.payload.code;
            console.log(ticket_code)

            window.location.href = `/purchaseOrder/${ticket_code}`
            
        }
      })
})

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

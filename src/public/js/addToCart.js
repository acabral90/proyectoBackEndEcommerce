
async function addToCart() {

    const btnAddToCart = document.getElementById('addToCart');
    const productId = document.getElementById('productId');

    btnAddToCart.addEventListener('click', evt => {
        const id = productId.textContent.substring(3);

    });

    return id;
}

export default addToCart;
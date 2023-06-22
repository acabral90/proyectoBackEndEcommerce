import CartManager from "../dao/manager/cartManager.js";

const cartManager = new CartManager();

export const getCartController = async (req, res)=>{

    const respuesta = await cartManager.getCarts();

    res.send({
        status: 'success',
        respuesta
    });
}

export const deleteCartController = async (req, res)=>{

    const cid = req.params.cid
    const respuesta = await cartManager.clearProductsInCart(cid);

    res.send({
        status: 'success',
        respuesta
    })
}

export const deleteProductCartController = async (req, res)=>{

    const cid = req.params.cid;
    const pid = req.params.pid;
    const respuesta = await cartManager.deleteProductCart(cid, pid);

    res.send({
        status: 'success',
        respuesta
    });
}

export const updateCartController = async (req, res) =>{
    
    const cid = req.params.cid;
    const newCart = req.body;
    const cart = await cartManager.getCarts(cid);
    const updateCart = await cartManager.updateApiCart(cart, newCart);

    res.send({
        status: 'success',
        cart
    });
}

export const updateProductCartController = async (req, res) => {

    const cid = req.params.cid;
    const pid = req.params.pid; 
    const newQuantity = req.body;
    const cart = await cartManager.getCarts(cid);
    const updateQuantity = await cartManager.updateProdQuantity(pid, newQuantity, cart);

    res.send({
        status: 'success',
        cart
    })
}
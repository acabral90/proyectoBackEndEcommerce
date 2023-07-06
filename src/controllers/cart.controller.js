import CartManager from "../dao/manager/cartManager.js";
import cartModel from "../dao/models/carts.js";
import productModel from "../dao/models/products.js";
import ticketModel from "../dao/models/tickets.js";
import { v4 as uuidv4 } from "uuid";


const cartManager = new CartManager();

export const getCartController = async (req, res)=>{
    const cid = req.params.cid
    const respuesta = await cartManager.getCarts(cid);

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

export const purchaserCartController = async (req, res) => {
    //console.log(req.session.user)
    try {
        const cartId = req.params.cid;
        const cart = await cartModel.find({_id:cartId}).lean().populate('products.product');
        if(cart[0]){
            if(!cart[0].products.length){
                return res.send("Es necesario que agregue productos.")
            }
            const ticketProducts = [];
            const rejectedProducts = [];
            let total = 0;

            for (let i = 0; i < cart[0].products.length; i++) {
                const cartProduct = cart[0].products[i];
                const productDB = await productModel.findById(cartProduct.product._id);
                //console.log(cartProduct)
                //Comparar la cantidad de los productos
                
                if(cartProduct.quantity <= productDB.stock){
                    ticketProducts.push({
                      productID: cartProduct.product._id,
                      price: cartProduct.product.price,
                      quantity: cartProduct.quantity
                    })
                    total += cartProduct.quantity*productDB.price;
                    const deletedProduct = await cartManager.deleteProductCart(cartId, cartProduct.product._id)
                    console.log(deletedProduct)
                }else{
                    rejectedProducts.push({
                        productID: cartProduct.product._id,
                        quantity: cartProduct.quantity
                    })
                    //console.log(rejectedProducts)
                }
            }
            
            const newTicket = {
                code: uuidv4(),
                purchase_datetime: new Date().toLocaleDateString(),
                amount: total,
                purchaser: req.session.user.email,
                products: ticketProducts
            }
            
            const ticketCreated = await ticketModel.create(newTicket);
            await cartModel.updateOne({_id:cartId},cart[0] );
            res.send(ticketCreated)

        }else{
            res.send("El carrito no existe")
        }

    } catch (error) {
        res.send(error.message)
    }

}
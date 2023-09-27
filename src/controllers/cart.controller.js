import CartManager from "../dao/manager/cartManager.js";
import cartModel from "../dao/models/carts.js";
import productModel from "../dao/models/products.js";
import ticketModel from "../dao/models/tickets.js";
import { v4 as uuidv4 } from "uuid";
import userModel from "../dao/models/user.js";


const cartManager = new CartManager();

export const createCartController = async (req, res, next) =>{
    const user = req.session.user;
    const userDb = await userModel.findOne({email: user.email});

    if(userDb.cart.length === 0){
        const cart = await cartManager.createCart();
        const {_id} = cart    
        userDb.cart.push({_id});
        const updateUser = await userModel.updateOne({_id: userDb._id}, {$set: userDb});
    };
    
    next();
};

export const getCartController = async (req, res)=>{
    
    const cart = req.session.user.cart[0]._id;
    
    const respuesta = await cartManager.getCarts(cart);
    console.log(respuesta)

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
        updateCart
    });
}

export const updateProductCartController = async (req, res) => {

    const cid = req.params.cid;
    const pid = req.params.pid; 
    const newQuantity = req.body;
    const updateQuantity = await cartManager.updateProdQuantity(pid, newQuantity, cid);

    res.send({
        status: 'success',
        updateQuantity
    })
}

export const purchaserCartController = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const cart = await cartModel.find({_id:cartId}).lean().populate('products.product');
        if(cart[0]){
            if(!cart[0].products.length){
                return res.send("Es necesario que agregues productos.")
            }
            const ticketProducts = [];
            const rejectedProducts = [];
            let total = 0;

            for (let i = 0; i < cart[0].products.length; i++) {
                const cartProduct = cart[0].products[i];
                const productDB = await productModel.findById(cartProduct.product._id);
                
                if(cartProduct.quantity <= productDB.stock){
                    ticketProducts.push({
                      productID: cartProduct.product._id,
                      price: cartProduct.product.price,
                      quantity: cartProduct.quantity
                    })
                    total += cartProduct.quantity*productDB.price;
                    
                    productDB.stock = productDB.stock - cartProduct.quantity;
                    await productModel.updateOne({_id: productDB._id}, productDB);

                }else{
                    rejectedProducts.push({
                        productID: cartProduct.product._id,
                        quantity: cartProduct.quantity
                    })
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
            console.log(ticketCreated)
            req.logger.info('Purcharse success');
            res.send({status: 'success', message: 'La compra se efectuó correctamente', payload: ticketCreated})

        }else{
            res.send({status: 'error', message: 'El carrito no existe'})
        }

    } catch (error) {
        req.logger.error('Purchase error')
        res.send(error.message)
    }
};

export const getTicketController = async (req, res)=>{
    
    const tid = req.params.tid;
    console.log(tid)
    //const ticket = await ticketModel.findOne({_id : tid}).lean()
    //req.logger.info('Se obtuvo el ticket')
    //res.send({status: 'success', message: 'Ticket obtenido'})
}
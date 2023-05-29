import { Router } from "express";
import CartManager from "../dao/manager/cartManager.js";
import ProductManager from "../dao/manager/productManager.js";


const router = Router();

const cartManager = new CartManager();
const productManager = new ProductManager();

/*router.post('/', async (req, res)=>{

    const respuesta = await cartManager.createCart();
    
    res.send({
        status: 'success',
        respuesta
    })

});*/

//Todos los endpoints que pide la consigna: GET, DELETE (x2) y PUT (x2)

router.get('/', async (req, res)=>{

    const respuesta = await cartManager.getCarts();

    res.send({
        status: 'success',
        respuesta
    });
});



router.delete('/:cid', async (req, res)=>{
    const cid = req.params.cid

    const respuesta = await cartManager.clearProductsInCart(cid);

    res.send({
        status: 'success',
        respuesta
    })
})

router.delete('/:cid/product/:pid', async (req, res)=>{
    const cid = req.params.cid;
    const pid = req.params.pid;

    const respuesta = await cartManager.deleteProductCart(cid, pid);

    res.send({
        status: 'success',
        respuesta
    });
});


router.put('/:cid', async (req, res) =>{
    
    const cid = req.params.cid;
    const newCart = req.body;

    const cart = await cartManager.getCarts(cid);

    const updateCart = await cartManager.updateApiCart(cart, newCart);

    res.send({
        status: 'success',
        cart
    });

})

router.put('/:cid/products/:pid', async (req, res) => {

    const cid = req.params.cid;
    const pid = req.params.pid; 
    const newQuantity = req.body;

    const cart = await cartManager.getCarts(cid);

    const updateQuantity = await cartManager.updateProdQuantity(pid, newQuantity, cart);

    res.send({
        status: 'success',
        cart
    })


})

export default router;
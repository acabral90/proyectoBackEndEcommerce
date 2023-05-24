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

router.post('/:cid/product/:pid', async (req, res)=>{
    const cid = req.params.cid;
    const pid = req.params.pid;

    const result = await cartManager.updateCart(cid, pid);

    const cart = await cartManager.getCarts();

    //console.log(result)

    let products = await productManager.getProducts();

    //console.log(products)

    let arrayProducts = [...products]

    res.render('products', {arrayProducts, style:'style.css'})

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

router.get('/', async (req, res)=>{

    const respuesta = await cartManager.getCarts();

    const result = JSON.stringify(respuesta, null, '\t')

    console.log(result)

    res.render('cart',{
        status: 'success',
        result
    });
})

router.post('/', async (req, res)=>{

    const cid = (req.params.cid);

    const respuesta = await cartManager.getCarts();

    res.send({
        status: 'success',
        respuesta
    });
});


export default router;
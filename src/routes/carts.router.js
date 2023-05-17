import { Router } from "express";
import CartManager from "../dao/manager/cartManager.js";

const router = Router();

const cartManager = new CartManager();

router.post('/', async (req, res)=>{

    const respuesta = await cartManager.createCart();
    
    res.send({
        status: 'success',
        respuesta
    })

});

router.post('/:cid/product/:pid', async (req, res)=>{
    const cid = req.params.cid;
    const pid = req.params.pid;

    const cart = await cartManager.updateCart(cid, pid);

    res.send({
        status: 'success',
        cart
    });
});

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

    res.send({
        status: 'success',
        respuesta
    });
})

router.get('/:cid', async (req, res)=>{

    const cid = (req.params.cid);

    const respuesta = await cartManager.getCartsById(cid);

    res.send({
        status: 'success',
        respuesta
    });
});


export default router;
import { Router } from "express";
import ProductManager from "../dao/manager/productManager.js";
import CartManager from "../dao/manager/cartManager.js";

const router = Router();

const productManager = new ProductManager();
const cartManager = new CartManager();

router.get('/', async (req, res)=>{

    const category = req.query;

    //console.log(category)

    const { page = 1 } = req.query; 

    let { result, code, status } = await productManager.getProductsPaginate(page, category);

    res.send({
        status,
        code,
        payload: result
    })
});

router.post('/', async (req, res) => {

    const product = req.body;

    const { result, code, status} = await productManager.addProducts(product)

    res.send({
        status,
        code,
        payload: result
    })
});

router.delete('/', async (req,res)=>{
    
    const product = req.body;

    console.log(product)

    const { code, status, result } = await productManager.deleteProduct(product)

    res.send({
        code,
        status,
        payload: result
    })
});

router.put('/', async (req,res)=>{

    const product = req.body;

    console.log(product)

    const { code, status, result } = await productManager.updateProduct(product)

    res.send({
        code,
        status,
        payload: result
    })
});

export default router;


import { Router } from "express";
import ProductManager from '../manager/productManager.js';
 
const router = Router();

const manager = new ProductManager();

router.get('/', async (req,res)=>{

    let products = await manager.getProducts();

    let arrayProducts = [...products]
    
    return res.render('home', {arrayProducts})
})

router.get('/realtimeproducts', async (req,res)=>{

    let products = await manager.getProducts();

    let arrayProducts = [...products]
    
    return res.render('realTimeProducts', {arrayProducts})
})

router.post('/realtimeproducts', async (req, res)=>{

    const product = req.body;

    let addItem = await manager.addProducts(product)

    let products = await manager.getProducts();

    let arrayProducts = [...products]
    
    res.render('realTimeProducts', {arrayProducts})
})

router.delete('/realtimeproducts', async (req,res)=>{
    
    const product = req.body;

    let productoEliminado = await manager.deleteProduct(product)

    let products = await manager.getProducts();

    let arrayProducts = [...products]
    
    res.render('realtimeproducts', {arrayProducts})

})

export default router 
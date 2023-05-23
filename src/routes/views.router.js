import { Router } from "express";
import productModel from "../dao/models/products.js";
import ProductManager from "../dao/manager/productManager.js";
 
const router = Router();

const manager = new ProductManager();

router.get('/chat', async (req, res)=>{
    res.render('chat', {})
})

/*router.get('/products', async (req,res)=>{

    let products = await manager.getProducts();

    let arrayProducts = [...products]
    
    return res.render('products', {arrayProducts, style:'style.css'})
})*/

/*router.get('/products', async (req, res)=>{

    const { page = 1 } = req.query; 

    const { result, code, status } = await manager.getProductsPaginate(page);

    const { docs, totalDocs, totalPages, hasNextPage, hasPrevPage, prevPage, nextPage } = result

    return  res.render( 'products', {
        status: status,
        docs,
        hasNextPage,
        hasPrevPage,
        page,
        prevPage,
        nextPage,
        style: 'style.css'

    })
})*/

router.get('/products', async (req, res)=>{

    const category = req.query;

    //console.log(category)

    const { page = 1 } = req.query; 

    let { result, code, status } = await manager.getProductsPaginate(page, category);

    //console.log(result)

    let { docs, totalDocs, totalPages, hasNextPage, hasPrevPage, prevPage, nextPage } = result

    //let pid = await manager.getProductById()

    //console.log(pid)

    return  res.render( 'products', {
        status: status,
        docs,
        hasNextPage,
        hasPrevPage,
        page,
        prevPage,
        nextPage,
        categoryExist: category.categorias === 'camisetas',
        style: 'style.css'

    })
})

/*router.get('/products/categories', async (req, res)=>{

    const category = req.query;

    const { page = 1 } = req.query; 

    //console.log(category)

    let { result, code, status } = await manager.getProductsPaginateCategories(page, category);

    //console.log(result)

    let { docs, totalDocs, totalPages, hasNextPage, hasPrevPage, prevPage, nextPage } = result

    return  res.render( 'products', {
        status: status,
        docs,
        hasNextPage,
        hasPrevPage,
        page,
        prevPage,
        nextPage,
        categoryExist: category.categorias === 'camisetas',
        style: 'style.css'

    })
})*/

router.post('/products', async (req, res)=>{

    const product = req.body;

    let addItem = await manager.addProducts(product)

    const { page = 1 } = req.query; 

    //console.log(products)

    const { result, hasPrevPage, hasNextPage, prevPage, nextPage, code, status } = await manager.getProductsPaginate();

    const products = result.docs

    //console.log(result)

    return  res.render( 'products', {
        status: status,
        products,
        hasNextPage,
        hasPrevPage,
        page,
        prevPage,
        nextPage,
        style: 'style.css'

    })
})


router.delete('/products', async (req,res)=>{
    
    const product = req.body;

    console.log(product)

    let productoEliminado = await manager.deleteProduct(product)

    let products = await manager.getProducts();

    let arrayProducts = [...products]
    
    res.render('products', {arrayProducts, style:'style.css'})

})

router.put('/products', async (req,res)=>{

    const product = req.body;

    console.log(product)

    let productUpdated = await manager.updateProduct(product)

    let products = await manager.getProducts();

    let arrayProducts = [...products]

    res.render('products', {arrayProducts, style:'style.css'})

})

export default router 
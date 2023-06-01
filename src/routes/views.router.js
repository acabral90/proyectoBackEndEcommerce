import { Router } from "express";
import ProductManager from "../dao/manager/productManager.js";
import CartManager from "../dao/manager/cartManager.js";
 
const router = Router();

const manager = new ProductManager();
const cartManager = new CartManager();

//Ruta del chat
router.get('/chat', async (req, res)=>{
    res.render('chat', {})
})

router.get('/products', async (req, res)=>{

    const category = req.query;

    //console.log(category)

    const { page = 1 } = req.query; 

    let { result, code, status } = await manager.getProductsPaginate(page, category);

    //console.log(result)

    let { docs, totalDocs, totalPages, hasNextPage, hasPrevPage, prevPage, nextPage } = result

    //let pid = await manager.getProductById()

    //console.log(pid)

    const user = req.session.user.name
    const admin = req.session.user.email.substring(0,5) == 'admin'

    return  res.render( 'products', {
        status: status,
        docs,
        hasNextPage,
        hasPrevPage,
        page,
        prevPage,
        nextPage,
        categoryExist: category.categorias === 'camisetas',
        style: 'style.css',
        user,
        admin

    })
});

router.post('/products', async (req, res)=>{

    const product = req.body;

    let addItem = await manager.addProducts(product)

    const { page = 1 } = req.query; 

    //console.log(products)

    const { result, hasPrevPage, hasNextPage, prevPage, nextPage, code, status } = await manager.getProductsPaginate();

    const products = result.docs


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

//Ruta de carrito
router.get('/carts', async (req, res)=>{

    const cid = req.params.cid;

    const respuesta = await cartManager.getCarts();

    //const result = JSON.stringify(respuesta, null, '\t')

    const cart = respuesta[0];

    res.render('cart',{
        status: 'success',
        cart,
        style: 'style.css'

    });
})



router.put('/:cid/product/:pid', async (req, res)=>{
    const cid = req.params.cid;
    const pid = req.params.pid;

    const result = await cartManager.updateCart(cid, pid);

    const cart = await cartManager.getCarts(cid);

    res.status(200).send({
        status: 'success',
        payload: cart
    })
   
});

//Rutas de login
router.get('/register', (req,res)=>{
    res.render('register',{
        style:'style.css'
    })
})

router.get('/', async (req,res)=>{
    res.render('login')
})

router.get('/profile', (req,res)=>{
    res.render('profile',{
        user: req.session.user
    })
})

export default router 
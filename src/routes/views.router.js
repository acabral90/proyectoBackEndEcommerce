import { Router } from "express";
import ProductManager from "../dao/manager/productManager.js";
import CartManager from "../dao/manager/cartManager.js";
 
const router = Router();

const manager = new ProductManager();
const cartManager = new CartManager();

const publicAccess = (req,res,next) =>{
    if(req.session.user) return res.redirect('/products');
    next();
}

const privateAccess = (req,res,next)=>{
    if(!req.session.user) return res.redirect('/');
    next();
}

//Ruta del chat
router.get('/chat', async (req, res)=>{
    res.render('chat', {})
})

router.get('/products', privateAccess, async (req, res)=>{

    const category = req.query;

    const { page = 1 } = req.query; 

    let { result, code, status } = await manager.getProductsPaginate(page, category);


    let { docs, totalDocs, totalPages, hasNextPage, hasPrevPage, prevPage, nextPage } = result

    const user = req.session.user.first_name

    

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

    })
});

router.post('/products', async (req, res)=>{

    const product = req.body;

    let addItem = await manager.addProducts(product)

    const { page = 1 } = req.query; 

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
router.get('/carts', privateAccess, async (req, res)=>{

    const cid = req.params.cid;

    const respuesta = await cartManager.getCarts();

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
router.get('/register', publicAccess, (req,res)=>{
    res.render('register',{
        style:'style.css'
    })
})

router.get('/', publicAccess, async (req,res)=>{
    res.render('login')
})

router.get('/profile', privateAccess, (req,res)=>{
    console.log(req.session.user)
    res.render('profile',{
        user: req.session.user,
    })
})

export default router 
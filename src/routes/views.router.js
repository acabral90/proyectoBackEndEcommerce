import { Router } from "express";
import { getCartController,
        getChatController,
        getProductsController,
        loginController,
        profileController,
        registerController,
        updateCartController
} from "../controllers/views.controller.js";
 
const router = Router();

//middlewares
const publicAccess = (req,res,next) =>{
    if(req.session.user) return res.redirect('/products');
    next();
}

const privateAccess = (req,res,next)=>{
    if(!req.session.user) return res.redirect('/');
    next();
}

//Ruta del chat
router.get('/chat', getChatController)

//Ruta de productos
router.get('/products', privateAccess, getProductsController);

//Ruta de carrito
router.get('/carts', privateAccess, getCartController)

router.put('/:cid/product/:pid', updateCartController);

//Rutas de login
router.get('/register', publicAccess, registerController)

router.get('/', publicAccess, loginController)

router.get('/profile', privateAccess, profileController)

export default router 
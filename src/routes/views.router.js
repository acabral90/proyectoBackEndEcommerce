import { Router } from "express";
import { getCartController,
        getChatController,
        getProductsController,
        loginController,
        profileController,
        registerController,
        updateCartController
} from "../controllers/views.controller.js";
import { privateAccess, publicAccess } from "../middlewares/middlewares.js";
 
const router = Router();

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
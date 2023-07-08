import { Router } from "express";
import { getCartController,
        getChatController,
        getProductsController,
        loginController,
        profileController,
        registerController,
        updateCartController
} from "../controllers/views.controller.js";
import { checkRole } from "../middlewares/middlewares.js";
import { passportLoginController } from "../controllers/auth.controller.js";

 
const router = Router();

//Ruta del chat
router.get('/chat', checkRole(["user"]), getChatController)

//Ruta de productos
router.get('/products', getProductsController);

//Ruta de carrito
router.get('/carts', checkRole(["user"]), getCartController)

router.put('/:cid/product/:pid', checkRole(["user"]), updateCartController);

//Rutas de login
router.get('/register', registerController)

router.get('/', loginController)

router.get('/profile', profileController)

export default router 
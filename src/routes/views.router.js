import { Router } from "express";
import { getCartController,
        getChatController,
        getProductsController,
        loginController,
        profileController,
        registerController,
        updateCartController,
        forgotPasswordController,
        resetPasswordController
} from "../controllers/views.controller.js";
import { checkRole } from "../middlewares/checkRole.js";
import { createCartController } from "../controllers/cart.controller.js";




 
const router = Router();

//Ruta del chat
router.get('/chat', checkRole(["user"]), getChatController)

//Ruta de productos
router.get('/products', getProductsController);

//Ruta de carrito
router.get('/carts', checkRole(["user"]), getCartController)

router.put('/:cid/product/:pid', checkRole(["user"]), updateCartController);

//Rutas de login
router.get('/register', registerController);

router.get('/', loginController);

router.get('/profile', profileController);

//Rutas para reestablecer contraseña
router.get('/forgot-password', forgotPasswordController);

router.get('/reset-password', resetPasswordController);

export default router 
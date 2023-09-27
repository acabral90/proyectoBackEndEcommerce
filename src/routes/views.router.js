import { Router } from "express";
import { getCartController,
        getChatController,
        getProductsController,
        loginController,
        profileController,
        registerController,
        updateCartController,
        forgotPasswordController,
        resetPasswordController,
        usersViewsController,
        purcharseOrderController
} from "../controllers/views.controller.js";
import { checkRole } from "../middlewares/checkRole.js";
import { createCartController } from "../controllers/cart.controller.js";

const router = Router();

//Vista del chat
router.get('/chat', checkRole(["user"]), getChatController)

//Vista de productos
router.get('/products', getProductsController);

//Vistas de carrito
router.get('/carts', checkRole(["user", "premium"]), getCartController)

//Vista de orden de compra
router.get('/purchaseOrder/:tid', checkRole(["user", "premium"]), purcharseOrderController)

//Rutas de login
router.get('/register', registerController);

router.get('/', loginController);

router.get('/profile', profileController);

//Rutas para reestablecer contraseña
router.get('/forgot-password', forgotPasswordController);

router.get('/reset-password', resetPasswordController);

//Ruta para administrar usuarios
router.get('/users', checkRole(['admin']), usersViewsController)



export default router 
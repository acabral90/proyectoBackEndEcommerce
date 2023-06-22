import { Router } from "express";
import { getCartController,
    deleteCartController,
    deleteProductCartController,
    updateCartController,
    updateProductCartController,
} from "../controllers/cart.controller.js";

const router = Router();

router.get('/', getCartController);

router.delete('/:cid', deleteCartController)

router.delete('/:cid/product/:pid', deleteProductCartController);

router.put('/:cid', updateCartController)

router.put('/:cid/products/:pid', updateProductCartController)

export default router;
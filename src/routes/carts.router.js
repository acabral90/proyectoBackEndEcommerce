import { Router } from "express";
import { getCartController,
    deleteCartController,
    deleteProductCartController,
    updateCartController,
    updateProductCartController,
    purchaserCartController,
    createCartController
} from "../controllers/cart.controller.js";

const router = Router();

router.get('/:cid', getCartController);

router.delete('/:cid', deleteCartController);

router.post('/', createCartController);

router.put('/:cid', updateCartController);

router.delete('/:cid/products/:pid', deleteProductCartController);

router.put('/:cid/products/:pid', updateProductCartController);

router.post('/:cid/purchaser', purchaserCartController)

export default router;
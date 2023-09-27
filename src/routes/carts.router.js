import { Router } from "express";
import { getCartController,
    deleteCartController,
    deleteProductCartController,
    updateCartController,
    updateProductCartController,
    purchaserCartController,
    createCartController,
    getTicketController
} from "../controllers/cart.controller.js";

const router = Router();

router.get('/:cid', getCartController);

router.delete('/:cid', deleteCartController);

router.post('/', createCartController);

router.put('/:cid', updateCartController);

router.delete('/:cid/products/:pid', deleteProductCartController);

router.put('/:cid/product/:pid', updateProductCartController);

router.post('/:cid/purchase', purchaserCartController);

router.get('/tickets/:tid', getTicketController)

export default router;
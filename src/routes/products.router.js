import { Router } from "express";
import { getProductsController,
    createProductController,
    deleteProductController,
    updateProductController 
} from "../controllers/product.controller.js";

const router = Router();

router.get('/', getProductsController);

router.post('/', createProductController);

router.delete('/', deleteProductController);

router.put('/', updateProductController);

export default router;


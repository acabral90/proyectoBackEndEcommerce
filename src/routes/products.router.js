import { Router } from "express";
import { getProductsController,
    createProductController,
    deleteProductController,
    updateProductController 
} from "../controllers/product.controller.js";
import { checkRole } from "../middlewares/middlewares.js";


const router = Router();

router.get('/', getProductsController);

router.post('/', checkRole(["admin", "premium"]), createProductController);

router.delete('/', checkRole(["admin", "premium"]),deleteProductController);

router.put('/', checkRole(["admin", "premium"]),updateProductController);

export default router;


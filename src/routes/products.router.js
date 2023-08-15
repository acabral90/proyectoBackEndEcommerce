import { Router } from "express";
import { getProductsController,
    getProductController,
    createProductController,
    deleteProductController,
    updateProductController 
} from "../controllers/product.controller.js";
import { checkRole } from "../middlewares/middlewares.js";


const router = Router();

router.get('/', getProductsController);

router.get('/:pid', getProductController)

router.post('/', checkRole(["admin", "premium"]), createProductController);

router.delete('/:pid', checkRole(["admin", "premium"]),deleteProductController);

router.put('/:pid', checkRole(["admin", "premium"]),updateProductController);

export default router;


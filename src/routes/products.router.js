import { Router } from "express";
import { getProductsController,
    getProductController,
    createProductController,
    deleteProductController,
    updateProductController,
    uploadImagesController 
} from "../controllers/product.controller.js";
import { checkRole } from "../middlewares/checkRole.js";
import { uploaderProduct } from "../utils.js";


const router = Router();

router.get('/', getProductsController);

router.get('/:pid', getProductController)

router.post('/', checkRole(["admin", "premium"]), createProductController);

router.post('/:pid', uploaderProduct.fields([{name: 'images', maxCount: 5}]), uploadImagesController)

router.delete('/:pid', checkRole(["admin", "premium"]),deleteProductController);

router.put('/:pid', checkRole(["admin", "premium"]),updateProductController);

export default router;


import { Router } from "express";
import { userDocumentsController, userPremiumController } from "../controllers/user.controller.js";
import { checkRole } from "../middlewares/checkRole.js";
import { uploaderDocument } from "../utils.js";

const router = Router();

router.get('/premium/:uid', checkRole(['admin']), userPremiumController);

router.post('/:uid/documents', uploaderDocument.fields([{name: "identificacion", maxCount: 1}, {name: "domicilio", maxCount: 1}, {name: "estadoDeCuenta", maxCount: 1}]), userDocumentsController);

export { router as usersRouter }
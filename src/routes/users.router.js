import { Router } from "express";
import { userDeleteController, userDocumentsController, userPremiumController, usersController, usersDeleteController } from "../controllers/user.controller.js";
import { checkRole } from "../middlewares/checkRole.js";
import { uploaderDocument } from "../utils.js";

const router = Router();

router.get('/', usersController);

router.post('/premium/:uEmail', checkRole(['admin']), userPremiumController);

router.post('/:uid/documents', uploaderDocument.fields([{name: "identificacion", maxCount: 1}, {name: "domicilio", maxCount: 1}, {name: "estadoDeCuenta", maxCount: 1}]), userDocumentsController);

router.delete('/:user', userDeleteController)

router.delete('/', usersDeleteController)

export { router as usersRouter }
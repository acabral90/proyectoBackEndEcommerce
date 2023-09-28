import { Router } from 'express';
import { failRegisterController,
        failLoginController,
        logoutController,
        currentController,
        passportGithubController,
        passportGithubCallbackController,
        githubCallbackController,
        passportRegisterController,
        registerController,
        loginController,
        passportLoginController,
        forgotPasswordController,
        resetPasswordController
} from '../controllers/auth.controller.js';
import { createCartController } from '../controllers/cart.controller.js';
import { lastConnection } from '../middlewares/lastConnection.js';
import { uploaderProfile } from '../utils.js';

const router = Router();

router.get('/failregister', failRegisterController);

router.get('/faillogin',failLoginController);

router.get('/logout', lastConnection, logoutController);

router.get('/current', currentController);

router.get('/github', passportGithubController);

router.get('/githubcallback', passportGithubCallbackController, githubCallbackController);

router.post('/register', uploaderProfile.single('profile'), passportRegisterController, registerController);

router.post('/', passportLoginController, createCartController, loginController, lastConnection);

router.post('/forgot-password', forgotPasswordController);

router.post('/reset-password', resetPasswordController);

export default router;
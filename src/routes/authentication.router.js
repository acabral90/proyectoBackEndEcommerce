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
        resetPasswordController,
        userPremiumController
} from '../controllers/auth.controller.js';
import { checkRole } from '../middlewares/middlewares.js';

const router = Router();

router.get('/failregister', failRegisterController);

router.get('/faillogin',failLoginController);

router.get('/logout', logoutController);

router.get('/current', currentController)

router.get('/github', passportGithubController)

router.get('/githubcallback', passportGithubCallbackController, githubCallbackController);

router.post('/register', passportRegisterController, registerController);

router.post('/', passportLoginController, loginController);

router.post('/forgot-password', forgotPasswordController);

router.post('/reset-password', resetPasswordController);

router.get('/premium/:uid', checkRole(['admin']), userPremiumController)

export default router;
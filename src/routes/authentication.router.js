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
} from '../controllers/auth.controller.js';

const router = Router();

router.get('/failregister', failRegisterController);

router.get('/faillogin',failLoginController);

router.get('/logout', logoutController);

router.get('/current', currentController)

router.get('/github', passportGithubController)

router.get('/githubcallback', passportGithubCallbackController, githubCallbackController);

router.post('/register', passportRegisterController, registerController);

router.post('/', passportLoginController, loginController);

export default router;
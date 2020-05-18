import { Router, Request, Response } from 'express';
import auth from './api/AuthRouter';
import recipe from './api/RecipeRouter';
import user from './api/UserRouter';

const router: Router = Router();

router.use('/auth', auth);
router.use('/recipe', recipe);
router.use('/user', user);

export default router;

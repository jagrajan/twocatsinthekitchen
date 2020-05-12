import { Router, Request, Response } from 'express';
import auth from './api/AuthRouter';
import recipe from './api/RecipeRouter';

const router: Router = Router();

router.use('/auth', auth);
router.use('/recipe', recipe);

export default router;

import { Router } from 'express';
import auth from './api/AuthRouter';
import ingredient from './api/IngredientRouter';
import recipe from './api/RecipeRouter';
import unit from './api/UnitRouter';
import user from './api/UserRouter';

const router: Router = Router();

router.use('/auth', auth);
router.use('/ingredient', ingredient);
router.use('/recipe', recipe);
router.use('/unit', unit);
router.use('/user', user);

export default router;

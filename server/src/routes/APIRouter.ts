import { Router } from 'express';
import auth from './api/AuthRouter';
import image from './api/ImageRouter';
import ingredient from './api/IngredientRouter';
import recipe from './api/RecipeRouter';
import tag from './api/TagRouter';
import unit from './api/UnitRouter';
import user from './api/UserRouter';

const router: Router = Router();

router.use('/auth', auth);
router.use('/image', image);
router.use('/ingredient', ingredient);
router.use('/recipe', recipe);
router.use('/tag', tag);
router.use('/unit', unit);
router.use('/user', user);

export default router;

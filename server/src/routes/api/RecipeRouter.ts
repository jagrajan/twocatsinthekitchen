import { Router } from 'express';
import AsyncHandler from 'express-async-handler';
import {
  getVersionDetails,
  getDetails,
  getRecent,
  getDashboard,
  postIndex
} from 'controllers/recipe';
import isAdmin from 'middleware/isAdmin';

const router: Router = Router();

router.get('/recent', AsyncHandler(getRecent));
router.get('/dashboard', isAdmin(), AsyncHandler(getDashboard))
router.get('/:id', AsyncHandler(getDetails));
router.get('/version/:recipeId', AsyncHandler(getVersionDetails));
router.post('/', isAdmin(), AsyncHandler(postIndex));

export default router;

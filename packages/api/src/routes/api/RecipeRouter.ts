import { Router } from 'express';
import AsyncHandler from 'express-async-handler';
import {
  getVersionDetails,
  getVersions,
  getDetails,
  getRecent,
  getDashboard,
  getRelease,
  postRelease,
  postIndex
} from 'controllers/recipe';
import isAdmin from 'middleware/isAdmin';

const router: Router = Router();

router.get('/recent', AsyncHandler(getRecent));
router.get('/dashboard', isAdmin(), AsyncHandler(getDashboard))
router.get('/:id', AsyncHandler(getDetails));
router.get('/version/:recipeId', AsyncHandler(getVersionDetails));
router.get('/versions/:id', isAdmin(), AsyncHandler(getVersions));
router.get('/release/:id', isAdmin(), AsyncHandler(getRelease));
router.post('/release/:id', isAdmin(), AsyncHandler(postRelease));
router.post('/', isAdmin(), AsyncHandler(postIndex));

export default router;

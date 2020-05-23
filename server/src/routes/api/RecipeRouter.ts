import { Router } from 'express';
import AsyncHandler from 'express-async-handler';
import {
  getDetails,
  getRecent,
  getDashboard
} from 'controllers/recipe';
import isAdmin from 'middleware/isAdmin';

const router: Router = Router();

router.get('/recent', AsyncHandler(getRecent));
router.get('/dashboard', isAdmin(), AsyncHandler(getDashboard))
router.get('/:id', AsyncHandler(getDetails));

export default router;

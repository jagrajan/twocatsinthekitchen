import { Router } from 'express';
import AsyncHandler from 'express-async-handler';
import {
  getDetails,
  getRecent
} from 'controllers/recipe';

const router: Router = Router();

router.get('/recent', AsyncHandler(getRecent));
router.get('/:id', AsyncHandler(getDetails));

export default router;

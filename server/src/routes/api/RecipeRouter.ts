import { Router } from 'express';
import AsyncHandler from 'express-async-handler';
import {
  getRecent
} from 'controllers/recipe';

const router: Router = Router();

router.get('/recent', AsyncHandler(getRecent));

export default router;

import { Router } from 'express';
import AsyncHandler from 'express-async-handler';
import {
  getParamId
} from 'controllers/user';

const router: Router = Router();

router.get('/:id', AsyncHandler(getParamId));

export default router;

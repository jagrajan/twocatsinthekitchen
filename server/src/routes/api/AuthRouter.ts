import { Router } from 'express';
import AsyncHandler from 'express-async-handler';
import {
  getInfo,
  postLogin
} from 'controllers/auth';

const router: Router = Router();

router.post('/login', AsyncHandler(postLogin));
router.get('/info', AsyncHandler(getInfo));

export default router;

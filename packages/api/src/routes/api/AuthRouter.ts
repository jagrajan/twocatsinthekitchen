import { Router } from 'express';
import AsyncHandler from 'express-async-handler';
import {
  getInfo,
  getLogout,
  postLogin
} from 'controllers/auth';

const router: Router = Router();

router.post('/login', AsyncHandler(postLogin));
router.get('/logout', AsyncHandler(getLogout));
router.get('/info', AsyncHandler(getInfo));

export default router;

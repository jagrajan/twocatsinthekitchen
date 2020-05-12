import { Router } from 'express';
import AsyncHandler from 'express-async-handler';
import {
  postLogin
} from 'controllers/auth';

const router: Router = Router();

router.post('/login', AsyncHandler(postLogin));

export default router;

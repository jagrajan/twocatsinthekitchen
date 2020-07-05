import { Router } from 'express';
import AsyncHandler from 'express-async-handler';
import isAdmin from 'middleware/isAdmin';
import {
  postIndex
} from 'controllers/image';

const router: Router = Router();

router.post('/', isAdmin(), AsyncHandler(postIndex));

export default router;

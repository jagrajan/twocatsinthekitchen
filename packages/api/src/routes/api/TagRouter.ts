import { Router } from 'express';
import AsyncHandler from 'express-async-handler';
import {
  getAll,
  postIndex
} from 'controllers/tag';
import isAdmin from 'middleware/isAdmin';

const router: Router = Router();

router.get('/', isAdmin(), AsyncHandler(getAll));
router.post('/', isAdmin(), AsyncHandler(postIndex));

export default router;

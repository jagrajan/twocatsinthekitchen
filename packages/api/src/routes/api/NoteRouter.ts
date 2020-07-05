import { Router } from 'express';
import AsyncHandler from 'express-async-handler';
import {
  getIndex,
  postIndex
} from 'controllers/note';
import isUser from 'middleware/isUser';

const router: Router = Router();

router.get('/:id', isUser(), AsyncHandler(getIndex));
router.post('/:id', isUser(), AsyncHandler(postIndex));

export default router;

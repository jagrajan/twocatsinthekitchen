import { Router } from 'express';
import AsyncHandler from 'express-async-handler';
import {
  getAll
} from 'controllers/ingredient';
import isAdmin from 'middleware/isAdmin';

const router: Router = Router();

router.get('/', isAdmin(), AsyncHandler(getAll));

export default router;

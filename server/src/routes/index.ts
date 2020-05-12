import { Router } from 'express';
import api from './APIRouter';

const router: Router = Router();
router.use('/api/v1', api);

export default router;

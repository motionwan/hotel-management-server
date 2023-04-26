import { Router } from 'express';
import RefreshController from '../../controllers/staff-refresh/staff-refresh';

const router = Router();

router.get('/', RefreshController.refresh);

export default router;

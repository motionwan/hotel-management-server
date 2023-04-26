import { Router } from 'express';
import RefreshController from '../../controllers/Refresh/customer-refresh.controller

const router = Router();

router.get('/', RefreshController.refresh);

export default router;

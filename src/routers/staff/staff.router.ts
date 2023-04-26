import { Router } from 'express';
import StaffController from '../../controllers/staff/staff.controller';

const router = Router();
router.post('/', StaffController.register);
router.get('/verify/:token', StaffController.verify);
router.post('/forgot-password', StaffController.forgotPassword);
router.post('/reset-password/:token', StaffController.resetPassword);
router.post('/login', StaffController.login);
router.post('/logout', StaffController.logout);

export default router;

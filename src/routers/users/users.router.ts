import { Router } from 'express';
import UserController from '../../controllers/users/users.controller';

const router = Router();
router.post('/', UserController.register);
router.get('/verify/:token', UserController.verify);
router.post('/forgot-password', UserController.forgotPassword);
router.post('/reset-password/:token', UserController.resetPassword);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);

export default router;

// EMAILPORT = 587
// SECURE = true

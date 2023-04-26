import { Router } from 'express';
import BookingController from '../../controllers/bookings/bookings.controller';

const router = Router();

router.post('/', BookingController.create);
router.get('/:id', BookingController.get);
router.patch('/:id', BookingController.update);
router.delete('/:id', BookingController.delete);

export default router;

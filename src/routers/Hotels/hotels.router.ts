import { Router } from 'express';
import HotelController from '../../controllers/Hotels/hotels.controller';
import upload from '../../middleware/upload';

const router = Router();

// Create a new hotel
router.post('/', upload.single('logo'), HotelController.create);

// Read a single hotel by id
router.get('/:id', HotelController.read);

// Update a single hotel by id
router.put('/:id', HotelController.update);

// Delete a single hotel by id
router.delete('/:id', HotelController.delete);

// List all hotels
router.get('/', HotelController.list);

export default router;

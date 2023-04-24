import { Router } from 'express';
import AmenityController from '../../controllers/Amenities/amenities.controller';

const router = Router();
const amenityController = new AmenityController();

// GET all amenities
router.get('/', amenityController.getAll);

// GET a specific amenity by ID
router.get('/:id', amenityController.getById);

// CREATE a new amenity
router.post('/', amenityController.create);

// UPDATE an existing amenity by ID
router.put('/:id', amenityController.update);

// DELETE an existing amenity by ID
router.delete('/:id', amenityController.delete);

export default router;

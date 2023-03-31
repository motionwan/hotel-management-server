import { Router } from 'express';
import HousekeepingController from '../../controllers/houseKeeping/houseKeeping.controller';

const router = Router();

// Create a new housekeeping record
router.post('/', HousekeepingController.create);

// Read a single housekeeping record by id
router.get('/:id', HousekeepingController.read);

// Update a single housekeeping record by id
router.put('/:id', HousekeepingController.update);

// Delete a single housekeeping record by id
router.delete('/:id', HousekeepingController.delete);

// List all housekeeping records
router.get('/', HousekeepingController.list);

export default router;

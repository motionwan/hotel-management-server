import express from 'express';
import RoomController from '../../controllers/Rooms/rooms.controller';

const router = express.Router();

router.post('/', RoomController.create);
router.get('/', RoomController.read);
router.put('/:id', RoomController.update);
router.delete('/:id', RoomController.delete);

export default router;

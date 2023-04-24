import express from 'express';
import RoomController from '../../controllers/Rooms/rooms.controller';
import uploadRoomPics from '../../middleware/room-images';

const router = express.Router();

router.post('/', uploadRoomPics, RoomController.create);
router.get('/', RoomController.read);
router.put('/:id', RoomController.update);
router.delete('/:id', RoomController.delete);

export default router;

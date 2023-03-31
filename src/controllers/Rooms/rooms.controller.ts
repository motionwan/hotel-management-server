import { Request, Response } from 'express';
import RoomModel from '../../models/rooms.mongo';

class RoomController {
  async create(req: Request, res: Response) {
    try {
      const { roomNumber, type, amenities, hotel } = req.body;
      const room = new RoomModel({ roomNumber, type, amenities, hotel });
      await room.save();
      res.status(201).send(room);
    } catch (err: any) {
      res.status(400).send({ message: err.message });
    }
  }

  async read(req: Request, res: Response) {
    try {
      const rooms = await RoomModel.find({});
      res.send(rooms);
    } catch (err: any) {
      res.status(500).send({ message: err.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { roomNumber, type, amenities, hotel } = req.body;
      const { id } = req.params;
      const room = await RoomModel.findByIdAndUpdate(
        id,
        { roomNumber, type, amenities, hotel },
        { new: true }
      );
      res.send(room);
    } catch (err: any) {
      res.status(400).send({ message: err.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await RoomModel.findByIdAndDelete(id);
      res.sendStatus(204);
    } catch (err: any) {
      res.status(400).send({ message: err.message });
    }
  }
}

export default new RoomController();

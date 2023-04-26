import { Request, Response } from 'express';
import RoomModel, { Room } from '../../models/rooms.mongo';
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

class RoomController {
  async create(req: Request, res: Response) {
    try {
      const { roomNumber, price, capacity, amenities, type, hotelId } =
        req.body;
      const room = new RoomModel({
        roomNumber,
        type,
        amenities,
        hotelId,
        price,
        capacity,
      });
      if (req.files) {
        const roomPics = (req.files as Express.Multer.File[]).map(
          (file: Express.Multer.File) => file.filename
        );
        room.roomPics = roomPics;
      }
      await room.save();
      res.status(201).send(room);
    } catch (err: any) {
      console.log(err);
      res.status(500).send({ message: err.message });
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
      const { id } = req.params; // room id
      const { roomNumber, type, amenities, hotelId, price, capacity } =
        req.body;
      const updatedRoom = await RoomModel.findByIdAndUpdate(
        id,
        { roomNumber, type, amenities, hotelId, price, capacity },
        { new: true }
      );

      if (req.files) {
        const roomPics = (req.files as Express.Multer.File[]).map(
          (file: Express.Multer.File) => file.filename
        );
        updatedRoom!.roomPics = roomPics;
        await updatedRoom!.save();
      }

      res.status(200).send(updatedRoom);
    } catch (err: any) {
      res.status(500).send({ message: err.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await RoomModel.findByIdAndDelete(id);
      res.sendStatus(204);
    } catch (err: any) {
      res.status(500).send({ message: err.message });
    }
  }
}

export default new RoomController();

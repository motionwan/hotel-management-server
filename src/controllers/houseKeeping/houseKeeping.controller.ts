import { Request, Response } from 'express';
import HousekeepingModel from '../../models/houseKeeping.mongo';

class HousekeepingController {
  // Create a new housekeeping record
  async create(req: Request, res: Response) {
    try {
      const { room, date, description, createdBy } = req.body;
      const housekeeping = new HousekeepingModel({
        room,
        date,
        description,
        createdBy,
      });
      await housekeeping.save();
      res
        .status(201)
        .json({ message: 'Housekeeping record created', housekeeping });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }

  // Read a single housekeeping record by id
  async read(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const housekeeping = await HousekeepingModel.findById(id)
        .populate('room')
        .populate('createdBy');
      if (!housekeeping) {
        return res
          .status(404)
          .json({ message: 'Housekeeping record not found' });
      }
      res.status(200).json(housekeeping);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }

  // Update a single housekeeping record by id
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { room, date, description, createdBy } = req.body;
      const housekeeping = await HousekeepingModel.findByIdAndUpdate(
        id,
        { room, date, description, createdBy },
        { new: true }
      );
      if (!housekeeping) {
        return res
          .status(404)
          .json({ message: 'Housekeeping record not found' });
      }
      res.status(200).json(housekeeping);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }

  // Delete a single housekeeping record by id
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const housekeeping = await HousekeepingModel.findByIdAndDelete(id);
      if (!housekeeping) {
        return res
          .status(404)
          .json({ message: 'Housekeeping record not found' });
      }
      res.status(200).json(housekeeping);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }

  // List all housekeeping records
  async list(req: Request, res: Response) {
    try {
      const housekeepings = await HousekeepingModel.find()
        .populate('room')
        .populate('createdBy');
      res
        .status(200)
        .json({ message: 'Housekeeping records found', housekeepings });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }
}

export default new HousekeepingController();

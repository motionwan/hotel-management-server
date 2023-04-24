import { Request, Response } from 'express';
import AmenityModel from '../../models/amenities.mongo';

class AmenityController {
  // Get all amenities
  async getAll(req: Request, res: Response) {
    try {
      const amenities = await AmenityModel.find({});
      res.status(200).send(amenities);
    } catch (err: any) {
      res.status(500).send({ message: err.message });
    }
  }

  // Get a specific amenity by ID
  async getById(req: Request, res: Response) {
    try {
      const amenity = await AmenityModel.findById(req.params.id);
      if (!amenity) {
        return res.status(404).send({ message: 'Amenity not found' });
      }
      res.status(200).send(amenity);
    } catch (err: any) {
      res.status(500).send({ message: err.message });
    }
  }

  // Create a new amenity
  async create(req: Request, res: Response) {
    try {
      const { hotelId, name, condition } = req.body;
      const amenity = new AmenityModel({
        hotelId,
        name,
        condition,
      });
      await amenity.save();
      res.status(201).send(amenity);
    } catch (err: any) {
      res.status(400).send({ message: err.message });
    }
  }

  // Update an existing amenity by ID
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { hotelId, name, condition } = req.body;
      const amenity = await AmenityModel.findByIdAndUpdate(
        id,
        { hotelId, name, condition },
        {
          new: true,
          runValidators: true,
        }
      );
      if (!amenity) {
        return res.status(404).send({ message: 'Amenity not found' });
      }
      res.status(200).send(amenity);
    } catch (err: any) {
      res.status(400).send({ message: err.message });
    }
  }

  // Delete an existing amenity by ID
  async delete(req: Request, res: Response) {
    try {
      const amenity = await AmenityModel.findByIdAndDelete(req.params.id);
      if (!amenity) {
        return res.status(404).send({ message: 'Amenity not found' });
      }
      res.status(200).send({ message: 'Amenity deleted' });
    } catch (err: any) {
      res.status(500).send({ message: err.message });
    }
  }
}

export default AmenityController;

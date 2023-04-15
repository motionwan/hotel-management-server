import { Request, Response } from 'express';
import HotelModel from '../../models/hotels.mongo';

class HotelController {
  // Create a new hotel
  async create(req: Request, res: Response) {
    try {
      const { name, address, city, state, phone, email, country, settings } =
        req.body;

      let logo: string = '';

      if (req.file) {
        logo = req.file.path;
      }

      const hotel = new HotelModel({
        name,
        address,
        city,
        state,
        phone,
        email,
        country,
        settings,
        logo,
      });

      await hotel.save();
      res.status(201).json({ message: 'Hotel created', hotel });
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  }

  // Read a single hotel by id
  async read(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const hotel = await HotelModel.findById(id);
      if (!hotel) {
        return res.status(404).json({ message: 'Hotel not found' });
      }
      res.status(200).json(hotel);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }

  // Update a single hotel by id
  // Update a single hotel by id
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, address, city, state, phone, email, country, settings } =
        req.body;
      const hotel = await HotelModel.findById(id);
      if (!hotel) {
        return res.status(404).json({ message: 'Hotel not found' });
      }
      const updateFields: any = {
        name,
        address,
        city,
        state,
        phone,
        email,
        country,
        'settings.senderEmail': settings.senderEmail,
        'settings.sendGridApiKey': settings.sendGridApiKey,
        'settings.hubtelApiSecret': settings.hubtelApiSecret,
        'settings.hubtelClientId': settings.hubtelClientId,
      };
      if (req.file) {
        updateFields.logo = req.file.path;
      }
      const updatedHotel = await hotel.updateOne(updateFields);
      res.status(200).json({ message: 'Hotel updated', hotel: updatedHotel });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }

  // Delete a single hotel by id
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const hotel = await HotelModel.findByIdAndDelete(id);
      if (!hotel) {
        return res.status(404).json({ message: 'Hotel not found' });
      }
      res.status(200).json({ message: 'Hotel deleted', hotel });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }

  // List all hotels
  async list(req: Request, res: Response) {
    try {
      const hotels = await HotelModel.find({});
      res.status(200).json(hotels);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }
}

export default new HotelController();

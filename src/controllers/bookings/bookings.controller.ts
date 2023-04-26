import { Request, Response } from 'express';
import BookingModel from '../../models/booking.mongo';

class BookingController {
  public static async create(req: Request, res: Response) {
    try {
      const {
        roomId,
        checkInDate,
        checkOutDate,
        additionalServices,
        customer,
        totalPrice,
      } = req.body;

      const booking = new BookingModel({
        roomId,
        checkInDate,
        checkOutDate,
        additionalServices,
        customer,
        totalPrice,
      });

      await booking.save();

      res.status(201).json({
        status: 'success',
        data: {
          booking,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 'error',
        message: 'An error occurred while creating the booking',
      });
    }
  }

  public static async get(req: Request, res: Response) {
    try {
      const booking = await BookingModel.findById(req.params.id);

      if (!booking) {
        res.status(404).json({
          status: 'error',
          message: 'Booking not found',
        });
        return;
      }

      res.json({
        status: 'success',
        data: {
          booking,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 'error',
        message: 'An error occurred while getting the booking',
      });
    }
  }

  public static async update(req: Request, res: Response) {
    try {
      const {
        roomId,
        checkInDate,
        checkOutDate,
        additionalServices,
        customer,
        totalPrice,
      } = req.body;
      const { id } = req.params; //bookingId;
      const booking = await BookingModel.findByIdAndUpdate(
        id,
        {
          roomId,
          checkInDate,
          checkOutDate,
          additionalServices,
          customer,
          totalPrice,
        },
        { new: true }
      );

      if (!booking) {
        res.status(404).json({
          status: 'error',
          message: 'Booking not found',
        });
        return;
      }

      res.json({
        status: 'success',
        data: {
          booking,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 'error',
        message: 'An error occurred while updating the booking',
      });
    }
  }

  public static async delete(req: Request, res: Response) {
    try {
      const booking = await BookingModel.findByIdAndDelete(req.params.id);

      if (!booking) {
        res.status(404).json({
          status: 'error',
          message: 'Booking not found',
        });
        return;
      }

      res.status(204).json({
        status: 'success',
        data: null,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 'error',
        message: 'An error occurred while deleting the booking',
      });
    }
  }
}

export default BookingController;

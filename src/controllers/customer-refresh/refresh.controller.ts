import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Customer from '../../models/users.mongo';

class CustomerRefresh {
  async refresh(req: Request, res: Response) {
    try {
      const cookies = req.cookies;
      if (!cookies?.jwt)
        return res.status(401).json({ message: 'You are not authorized' });

      const refreshToken = cookies.jwt;

      const user = await Customer.findOne({ refreshToken: refreshToken });

      if (!user)
        return res.status(403).json({ message: 'User not found try again' });
      // evaluate jwt
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN as string,
        (err: any, decoded: any) => {
          if (err || user?.email !== decoded.email)
            return res.status(403).json({ message: 'Forbidden' });
          const accessToken = jwt.sign(
            {
              username: decoded.email,
            },
            process.env.ACCESS_TOKEN as string,
            { expiresIn: '10m' }
          );

          return res.json({
            accessToken: accessToken,
            firstName: user?.firstName,
            lastName: user?.lastName,
            email: user?.email,
            role: user?.role,
            hotelId: user?.hotelId,
            userId: user?._id,
          });
        }
      );
    } catch (err: any) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  }
}

export default new CustomerRefresh();

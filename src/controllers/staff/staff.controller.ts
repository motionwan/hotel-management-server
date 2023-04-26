import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import Staff from '../../models/staffs.mongo';
import Hotel from '../../models/hotels.mongo';
import jwt, { JwtPayload } from 'jsonwebtoken';
import sendMail from '../../utils/email';

interface TokenPayload extends JwtPayload {
  email: string;
}

class StaffController {
  async register(req: Request, res: Response) {
    try {
      const { firstName, lastName, email, password, role, hotelId } = req.body;

      // check if user is already registered
      const userExists = await Staff.findOne({ email });
      if (userExists) {
        return res.status(401).json({ message: 'User already registered' });
      }

      //if not then hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // now create the new user
      const user = new Staff({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role,
        hotelId,
      });

      await user.save(); // save the user

      //find user's hotel an pull out the settings
      const hotel = await Hotel.findById(user.hotelId);

      // send verification email to the new user
      const token = jwt.sign({ email }, process.env.ACCESS_TOKEN as string, {
        expiresIn: '1h',
      });
      const verificationLink = `http://localhost:3000/users/verify/${token}`;

      sendMail(
        hotel!.settings.host,
        hotel!.email,
        hotel!.settings.service,
        hotel!.email,
        hotel!.settings.emailPassword,
        user.email,
        'Please verify your email address',
        `<p>Hi ${user.lastName}  ',</p><p>Thank you for signing up for our hotel. Please click on the button below to confirm your email address and activate your account.</p><a href=${verificationLink} style="background-color: green; color: white; padding: 10px; text-decoration: none;">Confirm Registration</a><p>If you did not request this, please ignore this email.</p><p>Regards,</p><p>${hotel?.name} Team</p>`
      );
      if (!sendMail) {
        res.status(400).json({ message: 'Email not sent' });
      }

      res
        .status(201)
        .json({ message: 'User created, please check your email to verify' });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  async verify(req: Request, res: Response) {
    try {
      const { token } = req.params; // token in the email
      const decoded = jwt.verify(
        token,
        process.env.ACCESS_TOKEN as string
      ) as TokenPayload;
      const email = decoded?.email;
      const user = await Staff.findOneAndUpdate({ email }, { verified: true });
      if (!user) {
        res.status(404).json({
          message: 'User not found',
        });
      }
      res.status(200).json({ message: 'User verified successfully' });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }

  // forgot password takes email as an argument
  async forgotPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;

      // check if user is already registered
      const user = await Staff.findOne({ email });
      if (!user) {
        return res.status(404).json({
          message: 'User not found Please check your email and try again',
        });
      }

      // generate reset password token
      const token = jwt.sign({ email }, process.env.ACCESS_TOKEN as string, {
        expiresIn: '1h',
      });
      const resetPasswordLink = `http://localhost:3000/users/reset-password/${token}`;
      console.log(token);
      //find user's hotel an pull out the settings
      const hotel = await Hotel.findById(user.hotelId);

      sendMail(
        hotel!.settings.host,
        hotel!.email,
        hotel!.settings.service,
        hotel!.email,
        hotel!.settings.emailPassword,
        user.email,
        'Please verify your email address',
        `Hi ${user.lastName}  ',You have requested to reset your password for ${hotel?.name}. Please click on the button below to reset your password.</p><a href=${resetPasswordLink} style="background-color: green; color: white; padding: 10px; text-decoration: none;">Reset Password</a><p>If you did not request this, please ignore this email.</p><p>Regards,</p><p>${hotel?.name} Team</p>`
      );

      res
        .status(200)
        .json({ message: 'Password reset link sent to your email' });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }
  // reset password
  async resetPassword(req: Request, res: Response) {
    try {
      const { token } = req.params; // reset password token
      const { password } = req.body;

      const decoded = jwt.verify(
        token,
        process.env.ACCESS_TOKEN as string
      ) as TokenPayload;
      const email = decoded?.email;
      const user = await Staff.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      // hash new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // update user's password
      await Staff.findOneAndUpdate({ email }, { password: hashedPassword });

      res.status(200).json({ message: 'Password reset successful' });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }
  // login function for users
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // check if user with email exists
      const user = await Staff.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // compare provided password with hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // create a JWT token with user's email and user id
      // const token = jwt.sign(
      //   { email: user.email, userId: user._id },
      //   process.env.ACCESS_TOKEN as string,
      //   {
      //     expiresIn: '10m',
      //   }
      // );

      const accessToken = jwt.sign(
        {
          email: user.email,
          userId: user._id,
        },
        process.env.ACCESS_TOKEN as string,
        { expiresIn: '10m' }
      );

      const refreshToken = jwt.sign(
        { email: user.email, userId: user._id },
        process.env.REFRESH_TOKEN as string,
        { expiresIn: '1d' }
      );

      user.refreshToken = refreshToken;
      //user.accessToken = accessToken;

      await user.save();
      // send token as a cookie with http only

      res.cookie('jwt', refreshToken, {
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        accessToken: accessToken,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        hotelId: user.hotelId,
        userId: user._id,
      });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }

  async logout(req: Request, res: Response) {
    try {
      // on client side delete access token
      const cookies = req.cookies;
      if (!cookies) return res.sendStatus(204); // no content
      const refreshToken = cookies.jwt;

      // is refresh token in the db
      const foundUser = await Staff.findOne({ refreshToken });
      if (!foundUser) {
        res.clearCookie('jwt', {
          httpOnly: true,
          sameSite: 'none',
          secure: false,
        });
        return res.sendStatus(204);
      }
      //delete refresh token from the db
      foundUser.refreshToken = '';
      await foundUser.save();
      //console.log(result);
      res.clearCookie('jwt', {
        httpOnly: true,
        sameSite: 'none',
        secure: false,
      });
      res.sendStatus(204);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }
}
export default new StaffController();

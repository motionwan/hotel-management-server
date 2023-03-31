import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';

// Load environment variables
config();

// Create Express app
const app = express();
const corsOption = {
  credentials: true,
  origin: ['http://localhost:3000'],
};

// Enable CORS
app.use(cors(corsOption));

// Parse JSON request bodies
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

// import routes

import hotelRouter from './routers/Hotels/hotels.router';
import roomRouter from './routers/Rooms/rooms.router';
import houseKeepingRouter from './routers/houseKeeping/houseKeeping.router';
import usersRouter from './routers/users/users.router';
import refreshRouter from './routers/Refresh/refresh.router';

app.use('/hotel', hotelRouter);
app.use('/room', roomRouter);
app.use('/house-keeping', houseKeepingRouter);
app.use('/refresh', refreshRouter);
app.use('/users', usersRouter);

export default app;

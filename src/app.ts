import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
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

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

export default app;

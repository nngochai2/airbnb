import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import listingsRoutes from './routes/listingsRoutes.js';
import bookingsRoutes from './routes/bookingRoutes.js';
import cors from 'cors'

const app = express();

// Middleware for handling CORS policy
app.use(cors());
app.use(express.json());

dotenv.config();

let db;
let isDbConnected = false;
let client;

async function connectToDatabase() {
  try {
    if (!process.env.MONGODB_URI) {
      console.warn('MONGODB_URI not set. Running in offline mode with mock data');
      isDbConnected = false;
      app.locals.isDbConnected = false;
    } else {
      client = new MongoClient(process.env.MONGODB_URI);
      await client.connect();
      console.log('Connected to MongoDB');
      db = client.db('sample_airbnb');
      isDbConnected = true;
      
      // Make db available to route handlers
      app.locals.db = db;
      app.locals.isDbConnected = true;
    }
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    console.warn('Running in offline mode with mock data');
    isDbConnected = false;
    app.locals.isDbConnected = false;
  }
  
  // Set up routes regardless of DB connection
  app.use('/api/listings', listingsRoutes);
  app.use('/api/bookings', bookingsRoutes);
  
  const PORT = process.env.PORT || 3030;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}${isDbConnected ? ' (DB Connected)' : ' (Offline Mode - Mock Data)'})`));
}

connectToDatabase();
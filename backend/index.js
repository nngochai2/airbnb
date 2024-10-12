import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import listingsRoutes from './routes/listingsRoutes.js';
import bookingsRoutes from './routes/bookingRoutes.js';
import cors from 'cors'

const app = express();

// Middleware for handling CORS policy
app.use(cors())

dotenv.config();

const client = new MongoClient(process.env.MONGODB_URI);

let db;

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    db = client.db('sample_airbnb');
    
    // Make db available to route handlers
    app.locals.db = db;
    
    // Set up routes after DB connection
    app.use('/api/listings', listingsRoutes);
    app.use('/api/bookings', bookingsRoutes);
    
    const PORT = process.env.PORT || 3030;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  }
}

connectToDatabase();
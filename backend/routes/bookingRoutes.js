import express from 'express';
import { ObjectId } from 'mongodb';
import { mockListings, mockBookings } from '../mockData.js';

const router = express.Router();

// In-memory storage for bookings when DB is down
let inMemoryBookings = [...mockBookings];

// Create a new booking
router.post('/', async (req, res) => {
  try {
    console.log('Received booking data:', req.body);

    const { listing_id, ...bookingData } = req.body;

    if (!listing_id) {
      return res.status(400).json({ message: 'listing_id is required' });
    }

    const isDbConnected = req.app.locals.isDbConnected;

    if (isDbConnected) {
      const db = req.app.locals.db;
      const listingsCollection = db.collection('listings');
      const bookingsCollection = db.collection('bookings');

      // Check if the listing exists
      const listing = await listingsCollection.findOne({ _id: listing_id });
      if (!listing) {
        return res.status(404).json({ message: 'Listing not found' });
      }

      const booking = {
        listing_id,
        ...bookingData,
        start_date: new Date(bookingData.start_date),
        end_date: new Date(bookingData.end_date),
        created_at: new Date()
      };

      const result = await bookingsCollection.insertOne(booking);
      console.log('Booking created:', result.insertedId);
      res.status(201).json({ ...booking, _id: result.insertedId });
    } else {
      // Use mock data when database is unavailable
      const listing = mockListings.find(l => l._id === listing_id);
      if (!listing) {
        return res.status(404).json({ message: 'Listing not found' });
      }

      const booking = {
        _id: `booking_${Date.now()}`,
        listing_id,
        ...bookingData,
        start_date: new Date(bookingData.start_date),
        end_date: new Date(bookingData.end_date),
        created_at: new Date()
      };

      inMemoryBookings.push(booking);
      console.log('Booking created (in memory):', booking._id);
      res.status(201).json(booking);
    }
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});


// Get bookings for a listing
router.get('/listing/:listing_id', async (req, res) => {
  try {
    const { listing_id } = req.params;
    const isDbConnected = req.app.locals.isDbConnected;

    if (isDbConnected) {
      const bookingsCollection = req.app.locals.db.collection('bookings');
      const bookings = await bookingsCollection.find({ listing_id }).toArray();
      res.json(bookings);
    } else {
      // Use mock data when database is unavailable
      const bookings = inMemoryBookings.filter(b => b.listing_id === listing_id);
      res.json(bookings);
    }
  } catch (error) {
    console.error('Error fetching bookings:', error);
    // Fallback to mock data on error
    const { listing_id } = req.params;
    const bookings = inMemoryBookings.filter(b => b.listing_id === listing_id);
    res.json(bookings);
  }
});

// Get a single booking
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const isDbConnected = req.app.locals.isDbConnected;

    if (isDbConnected) {
      const db = req.app.locals.db;
      const bookingsCollection = db.collection('bookings');

      // Convert string ID to ObjectId
      const objectId = new ObjectId(id);

      const booking = await bookingsCollection.findOne({ _id: objectId });
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }

      res.json(booking);
    } else {
      // Use mock data when database is unavailable
      const booking = inMemoryBookings.find(b => b._id === id);
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }

      res.json(booking);
    }
  } catch (error) {
    console.error('Error fetching booking:', error);
    // Fallback to mock data on error
    const { id } = req.params;
    const booking = inMemoryBookings.find(b => b._id === id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(booking);
  }
});

export default router;
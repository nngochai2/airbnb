import express from 'express';
import { ObjectId } from 'mongodb';

const router = express.Router();

// Create a new booking
router.post('/', async (req, res) => {
  try {
    console.log('Received booking data:', req.body);

    const db = req.app.locals.db;
    if (!db) {
      throw new Error('Database connection not available');
    }

    const listingsCollection = db.collection('listings');
    const bookingsCollection = db.collection('bookings');

    const { listing_id, ...bookingData } = req.body;

    if (!listing_id) {
      return res.status(400).json({ message: 'listing_id is required' });
    }

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
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});


// Get bookings for a listing
router.get('/listing/:listing_id', async (req, res) => {
  try {
    const { listing_id } = req.params;
    const bookingsCollection = req.app.locals.db.collection('bookings');

    const bookings = await bookingsCollection.find({ listing_id }).toArray();
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get a single booking
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const db = req.app.locals.db;
    if (!db) {
      throw new Error('Database connection not available');
    }

    const bookingsCollection = db.collection('bookings');

    // Convert string ID to ObjectId
    const objectId = new ObjectId(id);

    const booking = await bookingsCollection.findOne({ _id: objectId });
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(booking);
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

export default router;
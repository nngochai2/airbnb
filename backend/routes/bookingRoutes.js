import express from 'express';
import { ObjectId } from 'mongodb';

const router = express.Router();

// Create a new booking
router.post('/', async (req, res) => {
  try {
    const listingsCollection = req.app.locals.db.collection('listingsAndReviews');
    const bookingsCollection = req.app.locals.db.collection('bookings');

    const listing = await listingsCollection.findOne({ _id: req.body.listing_id });
    if (!listing) return res.status(404).json({ message: 'Listing not found' });

    const booking = {
      listing_id: req.body.listing_id,
      start_date: new Date(req.body.start_date),
      end_date: new Date(req.body.end_date),
      client_name: req.body.client_name,
      email: req.body.email,
      daylightPhone: req.body.daylightPhone,
      mobilePhone: req.body.mobilePhone,
      postalAddress: req.body.postalAddress,
      homeAddress: req.body.homeAddress
    };

    const result = await bookingsCollection.insertOne(booking);
    res.status(201).json({ ...booking, _id: result.insertedId });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(400).json({ message: error.message });
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

export default router;
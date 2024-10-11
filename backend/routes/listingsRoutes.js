import express from 'express';
import { ObjectId } from 'mongodb';

const router = express.Router();

// Get all listings or filter by location, property type, and bedrooms
router.get('/', async (req, res) => {
  try {
    console.log('Attempting to fetch listings...');
    const { location, propertyType, bedrooms } = req.query;
    let query = {};

    if (location) query['address.market'] = new RegExp(location, 'i');
    if (propertyType) query.property_type = new RegExp(propertyType, 'i');
    if (bedrooms) query.bedrooms = parseInt(bedrooms);

    const listingsCollection = req.app.locals.db.collection('listingsAndReviews');
    const listings = await listingsCollection.find(query).limit(10).toArray();
    console.log(`Found ${listings.length} listings`);
    res.json(listings);
  } catch (error) {
    console.error('Error fetching listings:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get a single listing
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const listingsCollection = req.app.locals.db.collection('listingsAndReviews');
    const listing = await listingsCollection.findOne({ _id: id });

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    return res.status(200).json(listing);
  } catch (error) {
    console.error('Error fetching listing:', error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
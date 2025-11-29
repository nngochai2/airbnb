import express from 'express';
import { mockListings } from '../mockData.js';

const router = express.Router();

// Helper function to filter listings
function filterListings(listings, filters) {
  return listings.filter(listing => {
    if (filters.location && !new RegExp(filters.location, 'i').test(listing.address.market)) {
      return false;
    }
    if (filters.propertyType && !new RegExp(filters.propertyType, 'i').test(listing.property_type)) {
      return false;
    }
    if (filters.bedrooms && listing.bedrooms !== parseInt(filters.bedrooms)) {
      return false;
    }
    return true;
  });
}

// Get all listings or filter by location, property type, and bedrooms
router.get('/', async (req, res) => {
  try {
    const { location, propertyType, bedrooms } = req.query;
    const isDbConnected = req.app.locals.isDbConnected;

    if (isDbConnected) {
      let query = {};
      if (location) query['address.market'] = new RegExp(location, 'i');
      if (propertyType) query.property_type = new RegExp(propertyType, 'i');
      if (bedrooms) query.bedrooms = parseInt(bedrooms);

      const listingsCollection = req.app.locals.db.collection('listings');
      const listings = await listingsCollection.find(query).limit(10).toArray();
      res.json(listings);
    } else {
      // Use mock data when database is unavailable
      const filters = { location, propertyType, bedrooms };
      const filteredListings = filterListings(mockListings, filters).slice(0, 10);
      res.json(filteredListings);
    }
  } catch (error) {
    console.error('Error fetching listings:', error);
    // Fallback to mock data on error
    const { location, propertyType, bedrooms } = req.query;
    const filters = { location, propertyType, bedrooms };
    const filteredListings = filterListings(mockListings, filters).slice(0, 10);
    res.json(filteredListings);
  }
});

// Get a single listing
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const isDbConnected = req.app.locals.isDbConnected;

    if (isDbConnected) {
      const listingsCollection = req.app.locals.db.collection('listings');
      const listing = await listingsCollection.findOne({ _id: id });

      if (!listing) {
        return res.status(404).json({ message: 'Listing not found' });
      }

      res.json(listing);
    } else {
      // Use mock data when database is unavailable
      const listing = mockListings.find(l => l._id === id);

      if (!listing) {
        return res.status(404).json({ message: 'Listing not found' });
      }

      res.json(listing);
    }
  } catch (error) {
    console.error('Error fetching listing:', error);
    // Fallback to mock data on error
    const { id } = req.params;
    const listing = mockListings.find(l => l._id === id);

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    res.json(listing);
  }
});

export default router;
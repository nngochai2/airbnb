// scripts/populateListings.js
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const client = new MongoClient(process.env.MONGODB_URI);

async function populateListings() {
  try {
    await client.connect();
    const db = client.db('sample_airbnb');
    const listingsCollection = db.collection('listings');

    // Clear existing data
    await listingsCollection.deleteMany({});

    const listings = [];
    const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];
    const propertyTypes = ['Apartment', 'House', 'Loft', 'Condo', 'Villa'];

    for (let i = 1; i <= 20; i++) {
      const listing = {
        _id: `${i}`,
        name: `Listing ${i}`,
        summary: `Beautiful ${propertyTypes[i % 5]} in ${cities[i % 5]}`,
        property_type: propertyTypes[i % 5],
        bedrooms: Math.floor(Math.random() * 4) + 1,
        price: Math.floor(Math.random() * 200) + 50, // Simple number
        address: {
          market: cities[i % 5],
          country: 'United States'
        },
        review_scores: {
          review_scores_rating: Math.floor(Math.random() * 50) + 50
        },
        booking_ids: [] // Initialize with an empty array
      };
      listings.push(listing);
    }

    const result = await listingsCollection.insertMany(listings);
    console.log(`${result.insertedCount} listings inserted`);
  } catch (error) {
    console.error('Error populating listings:', error);
  } finally {
    await client.close();
  }
}

populateListings();
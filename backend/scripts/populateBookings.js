// scripts/populateBookings.js
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const client = new MongoClient(process.env.MONGODB_URI);

async function populateBookings() {
  try {
    await client.connect();
    const db = client.db('sample_airbnb');
    const bookingsCollection = db.collection('bookings');
    const listingsCollection = db.collection('listings');

    // Clear existing bookings
    await bookingsCollection.deleteMany({});

    // Reset booking_ids in listings
    await listingsCollection.updateMany({}, { $set: { booking_ids: [] } });

    const bookings = [];

    for (let i = 1; i <= 20; i++) {
      const startDate = new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + Math.floor(Math.random() * 7) + 1);

      const listingId = `listing${Math.floor(Math.random() * 20) + 1}`;
      
      const booking = {
        _id: new ObjectId(), // Generate a new ObjectId for each booking
        listing_id: listingId,
        start_date: startDate,
        end_date: endDate,
        client_name: `Client ${i}`,
        email: `client${i}@example.com`,
        daylightPhone: `+1 ${Math.floor(Math.random() * 1000000000)}`,
        mobilePhone: `+1 ${Math.floor(Math.random() * 1000000000)}`,
        postalAddress: `${Math.floor(Math.random() * 1000) + 1} Postal St, City, State, 12345`,
        homeAddress: `${Math.floor(Math.random() * 1000) + 1} Home St, City, State, 12345`
      };
      bookings.push(booking);

      // Update the corresponding listing with this booking ID
      await listingsCollection.updateOne(
        { _id: listingId },
        { $push: { booking_ids: booking._id } }
      );
    }

    const result = await bookingsCollection.insertMany(bookings);
    console.log(`${result.insertedCount} bookings inserted`);
    console.log('Listings updated with booking IDs');
  } catch (error) {
    console.error('Error populating bookings:', error);
  } finally {
    await client.close();
  }
}

populateBookings();
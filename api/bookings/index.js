import { MongoClient } from 'mongodb';

let cachedDb = null;

async function connectToDatabase() {
	if (cachedDb) {
		return cachedDb;
	}

	const client = await MongoClient.connect(process.env.MONGODB_URI);
	const db = await client.db('sample_airbnb');

	cachedDb = db;
	return db;
}

export default async function handler(req, res) {
	try {
		const db = await connectToDatabase();
		const bookingCollection = db.collection('bookings');
		const listingsCollection = db.collection('listings');

		if (req.method = 'POST') {
			const { listing_id, ...bookingData } = req.body;

			if (!listing_id) {
				return res.status(400).json({ message: 'listing_id is required' });
			}

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

			const result = await bookingCollection.insertOne(booking);
			res.status(201).json({ ...booking, _id: result.insertedId });
		} else if (req.method === 'GET') {
			const bookings = await bookingsCollection.find().toArray();
			res.status(200).json(bookings);
		} else {
			res.status(405).json({ message: 'Method not allowed' });
		} 
	} catch (error) {
		console.error('Error in booking API:', error);
		res.status(500).json({ message: 'Server error', error: error.message });
	}
}
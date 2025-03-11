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
		const listingsCollection = db.collection('listings');

		if (req.method === 'GET') {
			const listing = await listingsCollection.findOne({
				_id: id
			});

			if (!listing) {
				return res.status(404).json({ message: 'Listing not found' });
			}

			res.status(200).json(listing);
		} else {
			res.status(405).json({ message: 'Method not allowed' });
		}
	} catch (error) {
		console.error('Error in listing detail API:', error);
		res.status(500).json({ message: 'Server error', error: error.message });
	}
}
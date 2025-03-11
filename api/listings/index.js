import { MongoClient } from 'mongodb';

let cachedb = null;

async function connectToDatabase() {
	if (cachedb) {
		return cachedb;
	}

	const client = await MongoClient.connect(process.env.MONGODB_URI);
	const db = await client.db('sample_airbnb');

	cachedb = db;
	return db;
}

export default async function handler(req, res) {
	try {
		const db = await connectToDatabase();
		const listingsCollection = db.collection('listings')

		if (req.method === 'GET') {
			const { location, propertyType, bedrooms } = req.query;
			let query = {};

			if (location) query['address.market'] = new RegExp(location, 'i');
			if (propertyType) query.property_type = new RegExp(propertyType, 'i');
			if (bedrooms) query.bedrooms = parseInt(bedrooms);

			const listings = await listingsCollection.find(query).limit(10).toArray();
			res.status(200).json(listings);
		} else {
			res.status(405).json({ message: 'Method not allowed' });
		}
	} catch (error) {
		console.error('Error fetching listings:', error);
		res.status(500).json({ message: 'Internal server error', error: error.message });
	}
}
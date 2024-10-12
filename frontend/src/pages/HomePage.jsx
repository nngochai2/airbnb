import axios from 'axios';
import React, { useEffect, useState } from 'react'

const HomePage = () => {
	const [listings, setListings] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		axios
			.get('http://localhost:3030/api/listings')
			.then((response) => {
				setListings(response.data.data);
				setLoading(false);
			})
	}, []);

	if (loading) {
		return (
			<div className="flex justify-center items-center h-64">
				<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
			</div>
		)
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{listings.map(listing => (
				<ListingCard key={listing._id} listing={listing} />
			))}
		</div>
	)
}

export default HomePage

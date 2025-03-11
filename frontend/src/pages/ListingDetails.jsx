import axios from 'axios';
import React, { useEffect, useState } from 'react'
import LoadingSpinner from '../components/LoadingSpinner';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

const ListingDetails = () => {
	const [listing, setListing] = useState(null);
	const [loading, setLoading] = useState(true);
	const { id } = useParams();

	useEffect(() => {
		const fetchListing = async () => {
			try {
				const response = await axios.get(`/api/listings/${id}`);
				setListing(response.data);
				setLoading(false);
			} catch (error) {
				console.error('Error fetching listing details:', error);
				setLoading(false);
			}
		}

		fetchListing();
	}, [id]);

	// Helper function to safely get the price
	const getNumericValue = (value) => {
		if (typeof value === 'object' && value.$numberDecimal) {
			return parseFloat(value.$numberDecimal);
		}
		return parseFloat(value);
	};

	if (loading) {
		return <LoadingSpinner />
	}

	if (!listing) {
		return <div className='text-center mt-8 font-bold'>Sorry, listing not found.</div>
	}

	const price = getNumericValue(listing.price).toFixed(2);
	const rating = listing.review_scores && listing.review_scores.review_scores_rating
		? getNumericValue(listing.review_scores.review_scores_rating).toFixed(1)
		: 'N/A';

	return (
		<div className="max-w-4xl mx-auto p-4 mt-14">
			<h1 className="text-3xl font-bold mb-4">{listing.name}</h1>
			<p className="text-gray-600 mb-4">{listing.summary}</p>
			<div className="grid grid-cols-2 gap-4 mb-4">
				<div>
					<span className="font-semibold">Type:</span> {listing.property_type}
				</div>
				<div>
					<span className="font-semibold">Bedrooms:</span> {listing.bedrooms}
				</div>
				<div>
					<span className="font-semibold">Location:</span> {listing.address.market}, {listing.address.country}
				</div>
				<div>
					<span className="font-semibold">Rating:</span> {rating}/100
				</div>
			</div>
			<div className="flex justify-between items-center mb-6">
				<span className="text-lg font-semibold text-airbnb">${price} <span className="text-sm text-gray-500">/ night</span></span>
				<Link
					to={`/booking/${listing._id}`}
					className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition duration-300"
				>
					Book Now
				</Link>
			</div>
			{/* You can add more details here as needed */}
		</div>
	)
}

export default ListingDetails